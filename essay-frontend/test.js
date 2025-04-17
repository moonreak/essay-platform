const { MongoClient } = require('mongodb');

async function testConnection() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ 成功连接到MongoDB');

    const db = client.db('essay_platform');
    await db.collection('essays').insertOne({ test: new Date() });
    console.log('📝 测试文档写入成功');

    const count = await db.collection('essays').countDocuments();
    console.log(`📊 当前文档数量: ${count}`);
  } finally {
    await client.close();
  }
}

testConnection();
