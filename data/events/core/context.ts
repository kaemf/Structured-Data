export default interface Context {
    [key: string]: {
      content: string;
      type: string | number;
      start: string | number;
    };
}