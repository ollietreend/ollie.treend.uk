const contentGlob = import.meta.glob(`@src/content/*/*`);

const collections = [];

for (const path in contentGlob) {
  const collectionName = path.split("/")[3];
  if (!collections.includes(collectionName)) {
    collections.push(collectionName);
  }
}

const collectionExists = function (collectionName) {
  return collections.includes(collectionName);
};

export default collectionExists;
