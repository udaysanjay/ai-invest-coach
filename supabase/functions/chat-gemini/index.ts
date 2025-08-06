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

    // Get the last user message
    const lastMessage = messages[messages.length - 1]
    const userMessage = lastMessage?.type === 'user' ? lastMessage.content : ''

    // Check if this is the first analysis request
    const isFirstAnalysis = userMessage.toLowerCase().includes('analyse') || userMessage.toLowerCase().includes('analyze')

    // Create context from financial data
    const context = financialData ? 
      `You are a financial advisor for Indian markets. ${isFirstAnalysis ? 
        `First, display the user's financial data clearly, then provide a concise analysis.

        IMPORTANT: For the first analysis, follow this exact format:
        1. Show "📊 Your Financial Summary:" followed by the user's data
        2. Then say "By analyzing your financial status, I recommend:" 
        3. Provide a brief analysis (40-80 words only)
        4. End with follow-up questions

        User's Financial Data:
        - Monthly Earning: ₹${financialData.monthlyEarning}
        - Monthly Savings: ₹${financialData.savings}  
        - Monthly Expenses: ₹${financialData.expenses}
        - Net Surplus: ₹${financialData.monthlyEarning - financialData.expenses}
        - Savings Rate: ${((financialData.savings / financialData.monthlyEarning) * 100).toFixed(1)}%` :
        
        `User's Financial Profile:
        - Monthly Earning: ₹${financialData.monthlyEarning}
        - Monthly Savings: ₹${financialData.savings}
        - Monthly Expenses: ₹${financialData.expenses}
        
        Provide helpful financial advice based on this profile.`}` 
      : 'Provide general financial and investment advice for Indian markets.'

    const prompt = `${context}
    
    User Question: ${userMessage}
    
    ${isFirstAnalysis ? 
      'Remember: Show financial data first, then brief analysis (40-80 words), then ask follow-up questions.' :
      'Provide helpful, concise financial advice for Indian markets.'}`

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