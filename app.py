import streamlit as st
# from openai import OpenAI
import ollama
from langchain_ollama import ChatOllama as lollama
from langchain_community.chat_models import ChatOllama as collama
from langchain_core.messages import HumanMessage
from langchain_core.output_parsers import StrOutputParser
# from langchain_core.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain_core.callbacks import BaseCallbackHandler
from PIL import Image

import io
import base64
st.title("Guru-GPT: ")
st.sidebar.title("Menu")
home = st.sidebar.button("Home      🏠")
about= st.sidebar.button("About     ℹ️")
contact= st.sidebar.button("Contact 📞")
if about:
    st.title("ℹ️ About")
    st.write("This is an example Streamlit app with a sidebar menu.")
if contact:
    st.title("📞 Contact")
    st.write("You can reach us at example@example.com.")
model=st.sidebar.selectbox("Select Model",["llama3.2:3b","qwen3:4b","gemma3:4b","llava:7b"])
upload=st.sidebar.file_uploader("Upload Your Image:",type=["jpg","png"])
if upload:
    image = Image.open(upload)
    st.image(image, caption="Uploaded Image", use_column_width=True)

# Initialize chat history
if "messages" not in st.session_state:
    st.session_state.messages = []

# Display chat messages from history on app rerun
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])
def prompt_func(data):
    text = data["text"]
    image = data["image"]

    image_part = {
        "type": "image_url",
        "image_url": f"data:image/png;base64,{image}",
    }

    content_parts = []

    text_part = {"type": "text", "text": text}

    content_parts.append(image_part)
    content_parts.append(text_part)

    return [HumanMessage(content=content_parts)]

class StreamlitCallbackHandler(BaseCallbackHandler):
    def __init__(self, container):
        self.container = container
        self.text = ""

    def on_llm_new_token(self, token: str, **kwargs) -> None:
        self.text += token
        self.container.markdown(self.text + "▌")  # Optional blinking cursor

# Accept user input
if prompt := st.chat_input("Enter your message"):
    # Add user message to chat history
    st.session_state.messages.append({"role": "user", "content": prompt})
    # Display user message in chat message container
    with st.chat_message("user"):
        st.markdown(prompt)
    # Display assistant response in chat message container
    with st.chat_message("assistant"):
        # 
        full_response = ""
        # stream = ollama.chat(model=model, messages=st.session_state.messages, stream=True)
        output_placeholder = st.empty()  # Live update container
        stream_handler = StreamlitCallbackHandler(output_placeholder)

        
        if upload:
            # image = Image.open(upload)
            # st.image(image, caption="Uploaded Image", use_column_width=True)
            llm=collama(model=model,
                         temperature=0,
                         streaming=True,
                          callbacks=[stream_handler])
            hpromt=[HumanMessage(content=f"query")]
            buffered = io.BytesIO()
            image.save(buffered, format="PNG")
            img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
            chain=prompt_func|llm|StrOutputParser()
            stream=chain.invoke({"text": prompt, "image": img_str})
            st.write(stream)
            st.session_state.messages.append({"role": "assistant", "content": stream})
            # print(img_str)
        else:
            chat=lollama(model=model,
                          streaming=True,
                          callbacks=[stream_handler] )
            stream=chat.invoke(prompt)
            st.session_state.messages.append({"role": "assistant", "content": stream.content})

        # st.markdown(stream)
            # response_area.markdown()
        # response = 
    