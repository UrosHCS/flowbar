type StreamData = {
  message: string;
};

export class StreamHandler {
  constructor(
    private stream: ReadableStreamDefaultReader<Uint8Array>,
    private onAnswerChunk: (chunk: string) => void,
  ) {}

  async read(): Promise<StreamData> {
    let message = '';

    // Push the response to the streamed message
    while (true) {
      const { done, value } = await this.stream.read();
      if (done) break;

      let decoded = new TextDecoder('utf-8').decode(value);

      if (!decoded) continue;

      message += decoded;
      this.onAnswerChunk(decoded);
    }

    return { message };
  }
}
