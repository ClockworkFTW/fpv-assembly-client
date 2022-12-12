export const userRoles = {
  user: "user",
  admin: "admin",
};

export const partMeta = {
  name: {
    prop: "name",
    label: "Name",
    filter: null,
    unit: null,
  },
  manufacturer: {
    prop: "manufacturer",
    label: "Manufacturer",
    filter: "tags",
    unit: null,
  },
  weight: {
    prop: "weight",
    label: "Weight",
    filter: "range",
    unit: "g",
  },
  ratingAverage: {
    prop: "ratingAverage",
    label: "Price",
    filter: "rating",
  },
  currentPrice: {
    prop: "currentPrice",
    label: "Price",
    filter: "range",
    unit: "$",
  },
};

export const partTypes = {
  motor: {
    ...partMeta,
    kv: {
      prop: "kv",
      label: "KV",
      filter: "range",
      unit: "kv",
    },
    motorDiameter: {
      prop: "motorDiameter",
      label: "Motor Diameter",
      filter: "range",
      unit: "mm",
    },
    motorHeight: {
      prop: "motorHeight",
      label: "Motor Height",
      filter: "range",
      unit: "mm",
    },
    shaftDiameter: {
      prop: "shaftDiameter",
      label: "Shaft Diameter",
      filter: "range",
      unit: "mm",
    },
    motorMountWidth: {
      prop: "motorMountWidth",
      label: "Mount Width",
      filter: "range",
      unit: "mm",
    },
    motorMountLength: {
      prop: "motorMountLength",
      label: "Mount Length",
      filter: "range",
      unit: "mm",
    },
  },
  frame: {
    ...partMeta,
  },
  battery: {
    ...partMeta,
  },
  propeller: {
    ...partMeta,
  },
  "radio-receiver": {
    ...partMeta,
  },
  "video-camera": {
    ...partMeta,
  },
  "video-antenna": {
    ...partMeta,
  },
  " video-transmitter": {
    ...partMeta,
  },
  "flight-controller": {
    ...partMeta,
  },
  "electronic-speed-controller": {
    ...partMeta,
  },
};
