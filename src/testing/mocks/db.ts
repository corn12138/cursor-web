import { factory, primaryKey } from '@mswjs/data';
import { nanoid } from 'nanoid'; //  引入 nanoid 用于生成唯一 id

const models = {
    // 定义 User 模型
    user: {
        id: primaryKey(nanoid),
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        teamId: String,
        role: String,
        bio: String,
        createdAt: Date.now,
    },
    // 定义 Team 模型
    team: {
        id: primaryKey(nanoid),
        name: String,
        description: String,
        createdAt: Date.now,
    },
    // 定义 Discussion 模型
    discussion: {
        id: primaryKey(nanoid),
        title: String,
        body: String,
        authorId: String,
        teamId: String,
        createdAt: Date.now,
    },
    // 定义 Comment 模型
    comment: {
        id: primaryKey(nanoid),
        body: String,
        authorId: String,
        discussionId: String,
        createdAt: Date.now,
    }
}

export const db = factory(models); // 创建数据库实例

export type Model = keyof typeof models; // 获取模型名称

const dbFilePath = 'mocked-db.json'; // 定义数据库文件路径
export const loadDb = async () => {
    if (typeof window === 'undefined') {
        // 在 Node.js 环境下，从文件中加载数据库
        const { readFile, writeFile } = await import('fs/promises');

        try {
            const data = await readFile(dbFilePath, 'utf8');
            return JSON.parse(data);
        } catch (error: any) {
            if (error.code === 'ENOENT') {
                const emptyDB = {}
                await writeFile(dbFilePath, JSON.stringify(emptyDB, null, 2));
                return emptyDB;
            } else {
                console.error('Failed to load the database:', error);
                return null;
            }
        }
    }
    return Object.assign(JSON.parse(window.localStorage.getItem('msw-db') || '{}')); // 在浏览器环境下，从 localStorage 加载数据库
};

export const storeDb = async(data:string)=>{
    if(typeof window === 'undefined'){
        const {writeFile} = await import('fs/promises');
        await writeFile(dbFilePath,data) // 在 Node.js 环境下，将数据库存储到文件
    }else{
        window.localStorage.setItem('msw-db',data); // 在浏览器环境下，将数据库存储到 localStorage
    }
}

export const persisDb = async(model:Model)=>{
    if(process.env.NODE_ENV === 'test') return; // 如果是测试环境，不进行持久化
    const data = await loadDb();
    data[model] = db[model].getAll(); // 将指定模型的所有数据存储到数据库
    await storeDb(JSON.stringify(data)); // 将数据库存储到文件或 localStorage
}

export const initializeDb = async()=>{
    const database = await loadDb();
    Object.entries(db).forEach(([key,model])=>{
        const dataEntries = database[key]
        if(dataEntries){
            return;
        }else{
            dataEntries?.forEach((entry:Record<string,any>)=>{
                model.create(entry);
            }) // 将数据库中的数据加载到模型中
        }
    })
}

export const resetDb = ()=>{
    window.localStorage.clear(); // 清空 localStorage
}