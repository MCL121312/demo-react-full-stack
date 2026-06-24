const getPort = () => Number(process.env.PORT) || 4000;

export const createOpenApiSpec = (baseUrl?: string) => {
  const url = baseUrl || `http://localhost:${getPort()}`;
  return {
    openapi: '3.1.0',
    info: {
      title: 'Demo React Full Stack API',
      version: '1.0.0',
      description: '内容管理平台 API - 支持文章发布与会员分级阅读',
    },
    servers: [{ url, description: '当前服务器' }],
    tags: [
      { name: '读者端', description: '文章阅读接口' },
      { name: '管理端', description: '文章管理接口' },
    ],
    paths: {
      '/api/reader/articles': {
        get: {
          tags: ['读者端'],
          summary: '获取文章列表',
          description: '按会员等级筛选文章列表',
          parameters: [
            {
              name: 'tier',
              in: 'query',
              required: false,
              description: '会员等级筛选，默认 free',
              schema: { type: 'string', enum: ['free', 'vip'], default: 'free' },
            },
          ],
          responses: {
            '200': {
              description: '文章列表',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Article' },
                  },
                },
              },
            },
          },
        },
      },
      '/api/reader/articles/{id}': {
        get: {
          tags: ['读者端'],
          summary: '获取文章详情',
          description: '根据 ID 获取单篇文章',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: '文章 ID',
              schema: { type: 'integer' },
            },
          ],
          responses: {
            '200': {
              description: '文章详情',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Article' },
                },
              },
            },
            '404': { description: '文章不存在' },
          },
        },
      },
      '/api/admin/articles': {
        get: {
          tags: ['管理端'],
          summary: '获取所有文章',
          description: '列出所有文章（管理端用）',
          responses: {
            '200': {
              description: '文章列表',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Article' },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['管理端'],
          summary: '创建文章',
          description: '发布一篇新文章',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CreateArticleRequest' },
              },
            },
          },
          responses: {
            '201': {
              description: '创建成功',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Article' },
                },
              },
            },
            '400': { description: '请求参数错误' },
          },
        },
      },
      '/api/admin/articles/{id}': {
        get: {
          tags: ['管理端'],
          summary: '获取单篇文章',
          description: '根据 ID 获取文章详情（管理端用）',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: '文章 ID',
              schema: { type: 'integer' },
            },
          ],
          responses: {
            '200': {
              description: '文章详情',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Article' },
                },
              },
            },
            '404': { description: '文章不存在' },
          },
        },
        put: {
          tags: ['管理端'],
          summary: '更新文章',
          description: '修改已有文章内容',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: '文章 ID',
              schema: { type: 'integer' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CreateArticleRequest' },
              },
            },
          },
          responses: {
            '200': {
              description: '更新成功',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Article' },
                },
              },
            },
            '400': { description: '请求参数错误' },
            '404': { description: '文章不存在' },
          },
        },
        delete: {
          tags: ['管理端'],
          summary: '删除文章',
          description: '删除指定文章',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: '文章 ID',
              schema: { type: 'integer' },
            },
          ],
          responses: {
            '204': { description: '删除成功' },
          },
        },
      },
    },
    components: {
      schemas: {
        Article: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            title: { type: 'string', example: '免费文章1' },
            content: { type: 'string', example: '这是公开内容，所有人可见。' },
            tier: { type: 'string', enum: ['free', 'vip'], example: 'free' },
            published_at: {
              type: 'integer',
              nullable: true,
              description: '发布时间戳',
              example: null,
            },
          },
        },
        CreateArticleRequest: {
          type: 'object',
          required: ['title', 'content', 'tier'],
          properties: {
            title: { type: 'string', minLength: 1, example: '新文章标题' },
            content: { type: 'string', minLength: 1, example: '文章正文内容...' },
            tier: { type: 'string', enum: ['free', 'vip'], example: 'free' },
          },
        },
      },
    },
  };
};
