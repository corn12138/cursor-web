import * as z from 'zod';

const createEnv = () => {
    const envSchema = z.object({
        API_URL: z.string(),
        ENABLE_API_MOCKING: z //作用是定义一个枚举类型
            .string()
            .refine((s) => s === 'true' || s === 'false')
            .transform(s => s === 'true')
            .optional(), //这是一个可选的字段
        APP_URL: z.string().optional().default('http://localhost:3000'), //这里的目的是设置端口 3000 -是前端的端口
        APP_MOCK_API_PORT: z.string().optional().default('8080'), //这里的目的是设置端口 8080 -是后端的端口
    });

    const envVars = Object.entries(import.meta.env).reduce<
        Record<string, string>
    >((acc, curr) => {
        const [key, value] = curr;
        if (key.startsWith('VITE_APP_')) {
            acc[key.replace('VITE_APP_', '')] = value;
        }
        return acc;
    }, {});

    const parsedEnv = envSchema.safeParse(envVars); //这里的目的是解析环境变量

    if (!parsedEnv.success) {
        console.error(parsedEnv.error);
        throw new Error(
            `Invalid env provided.
      The following variables are missing or invalid:
      ${Object.entries(parsedEnv.error.flatten().fieldErrors)
                .map(([k, v]) => `- ${k}: ${v}`)
                .join('\n')}
      `,
        ); //这里的目的是抛出错误
    }

    return parsedEnv.data;
}
export const env = createEnv();