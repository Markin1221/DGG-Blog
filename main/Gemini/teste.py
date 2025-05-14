from google import genai

client = genai.Client(api_key="AIzaSyA89C0Py5BYiF5ns3wEYN4hqVtf8FUYeWM")

response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents="Explain how AI works in a few words",
)

print(response.text)