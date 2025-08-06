import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { messages, financialData } = await req.json()
    
    // Get the Gemini API key from Supabase secrets
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
    
    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured')
    }

    // Create context from financial data
    const context = financialData ? 
      `User's Financial Profile:
      - Monthly Earning: ₹${financialData.monthlyEarning}
      - Monthly Savings: ₹${financialData.savings}
      - Monthly Expenses: ₹${financialData.expenses}
      - Net Surplus: ₹${financialData.monthlyEarning - financialData.expenses}
      - Savings Rate: ${((financialData.savings / financialData.monthlyEarning) * 100).toFixed(1)}%
      
      Based on this financial profile, analyze and recommend:
      1. Appropriate investment types (SIP, PPF, ELSS, Index Funds, Bonds, etc.)
      2. Risk tolerance assessment based on income and savings
      3. Asset allocation strategy suitable for Indian markets
      4. Monthly investment amounts for each category
      5. Emergency fund requirements
      6. Tax-saving investment options under Section 80C
      
      Provide specific, actionable investment recommendations with amounts in Indian Rupees (₹).` 
      : 'Provide general financial and investment advice for Indian markets.'

    // Get the last user message
    const lastMessage = messages[messages.length - 1]
    const userMessage = lastMessage?.type === 'user' ? lastMessage.content : ''

    const prompt = `${context}
    
    User Question: ${userMessage}
    
    Please provide helpful, personalized financial advice. Keep responses concise but informative. Focus on practical investment strategies, risk management, and wealth building suitable for Indian markets.`

    // Call Gemini API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Gemini API error:', errorData)
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      "I'm here to help with your financial questions. Could you please rephrase your question?"

    return new Response(
      JSON.stringify({ response: aiResponse }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An error occurred while processing your request' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})