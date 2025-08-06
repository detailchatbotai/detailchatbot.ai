from pydantic import BaseModel


class WidgetEmbedResponse(BaseModel):
    embed_script: str