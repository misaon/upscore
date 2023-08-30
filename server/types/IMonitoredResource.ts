export type IMonitoredResource = {
  id: number;
  uuid: string;
  url: string;
  interval: number;
  isFavourite: boolean;
  createDate: Date;
  updateDate: Date;
};
