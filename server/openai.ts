import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user

// Create OpenAI client only when needed and check for API key
function getOpenAIClient(): OpenAI | null {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.warn("OPENAI_API_KEY not found - chat functionality will be limited");
    return null;
  }
  return new OpenAI({ apiKey });
}

export async function generateChatResponse(message: string, conversationHistory: Array<{role: 'user' | 'assistant', content: string}> = []): Promise<string> {
  try {
    // Check if OpenAI API key is available
    const openai = getOpenAIClient();
    if (!openai) {
      return "I'm sorry, our chat service is temporarily unavailable. Please call us at 07542 331 653 or use our contact form for assistance.";
    }
    const systemPrompt = `You are a helpful AI assistant for L&M Landscape Maintenance, a professional landscaping company based in Manchester Failsworth. You provide expert advice and assistance with:

SERVICES OFFERED:
- Digger & Driver Hire (heavy excavation, site preparation)
- Fencing, Sleepers & Decking (garden boundaries, outdoor structures)
- Outdoor Lighting (garden illumination, security lighting)
- External Painting (fences, sheds, outdoor structures)
- Garden Maintenance (regular lawn care, hedge trimming, seasonal cleanup)
- Full Landscape Design (complete garden transformations)
- Driveways & Patios (hard landscaping, paving)
- Free Consultations (project planning and quotes)

BUSINESS INFORMATION:
- Location: Manchester Failsworth, serving Greater Manchester
- Phone: 07542 331 653
- Email: info@landmlandscapes.co.uk
- Hours: Monday-Saturday, 8am-6pm
- Professional, reliable, and experienced team

TYPICAL PRICING RANGES (for reference):
- Garden Maintenance: £30-80 per visit
- Fencing: £40-120 per panel
- Digger Hire: £200-400 per day
- Landscape Design: £1000-5000+ depending on scope
- Consultations: Free for potential projects

YOUR ROLE:
- Answer questions about services and pricing
- Help customers choose the right service for their needs
- Provide maintenance tips and gardening advice
- Assist with booking appointments
- Be friendly, professional, and knowledgeable
- Always encourage customers to book a free consultation for detailed quotes
- Mention that they can use the online booking system for convenience

Keep responses concise but helpful. Always be encouraging about their landscaping projects!`;

    const messages = [
      { role: "system" as const, content: systemPrompt },
      ...conversationHistory.slice(-8), // Keep last 8 messages for context
      { role: "user" as const, content: message }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages,
      max_tokens: 300,
      temperature: 0.7,
    });

    return response.choices[0].message.content || "I'm sorry, I'm having trouble responding right now. Please try asking again or call us at 07542 331 653.";
  } catch (error) {
    console.error("Error generating chat response:", error);
    // Return a helpful fallback message instead of throwing an error
    return "I'm sorry, I'm having trouble responding right now. Please try asking again or call us at 07542 331 653 for immediate assistance.";
  }
}