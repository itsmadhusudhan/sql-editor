class DataRepository {
  static instance: DataRepository;
  worker!: Worker;

  initialise = () => {
    this.worker = new Worker(
      new URL("./alasql-init-worker.ts", import.meta.url),
      {
        type: "module",
      }
    );
  };

  runQuery = async (query: string) => {
    return new Promise<Record<string, unknown>[]>((resolve, reject) => {
      const callback = (event: MessageEvent) => {
        if (event.data.type === "RESULT") {
          resolve(event.data.data);
        } else {
          reject(event.data);
        }

        this.worker.removeEventListener("message", callback);
      };

      this.worker.addEventListener("message", callback);

      this.worker.postMessage({
        type: "QUERY",
        data: query,
      });
    });
  };

  constructor() {
    if (!DataRepository.instance) {
      DataRepository.instance = this;
      this.initialise();
    }
    return DataRepository.instance;
  }
}

const respository = Object.freeze(new DataRepository());

export { respository };
