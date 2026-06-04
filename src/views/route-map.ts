/**
 * 视图路由映射
 * 仅注册「模板内已有」的示例页面，不包含具体业务系统的页面。
 * 从本模板生成新项目后，在此补充 views 下的页面与 linkPath 的映射即可。
 */

import type { RouteRecordRaw } from 'vue-router';
import { t } from '@platform/i18n';

export interface ViewRouteConfig {
  component: () => Promise<unknown>;
  name?: string;
  meta: {
    titleKey: string;
    titleDefault: string;
    requiresAuth: boolean;
    showInHome?: boolean;
  };
}

function resolveRouteTitle(meta: ViewRouteConfig['meta']): string {
  return t(meta.titleKey, meta.titleDefault);
}

/** 路由路径 -> 视图配置
 * 模板默认不包含任何「system」示例页面。
 * 你可以在子应用生成后按需补充 `views/*` 并在这里注册。
 */
export const routeMap: Record<string, ViewRouteConfig> = {
  // generator 生成的业务模块已移除；此处仅保留项目内真实存在的 views 映射
  '/space': {
    component: () => import('@/views/space/index.vue'),
    name: 'Space',
    meta: {
      titleKey: 'CMS_ROUTE_SPACE',
      titleDefault: '空间',
      requiresAuth: true,
      showInHome: true,
    },
  },
  '/channel': {
    component: () => import('@/views/channel/index.vue'),
    name: 'Channel',
    meta: {
      titleKey: 'CMS_ROUTE_CHANNEL',
      titleDefault: '频道',
      requiresAuth: true,
      showInHome: true,
    },
  },
  '/article': {
    component: () => import('@/views/article/index.vue'),
    name: 'Article',
    meta: {
      titleKey: 'CMS_ROUTE_ARTICLE',
      titleDefault: '文章',
      requiresAuth: true,
      showInHome: true,
    },
  },
  '/page': {
    component: () => import('@/views/page/index.vue'),
    name: 'Page',
    meta: {
      titleKey: 'CMS_ROUTE_PAGE',
      titleDefault: '页面',
      requiresAuth: true,
      showInHome: true,
    },
  },
  '/tag': {
    component: () => import('@/views/tag/index.vue'),
    name: 'Tag',
    meta: {
      titleKey: 'CMS_ROUTE_TAG',
      titleDefault: '标签',
      requiresAuth: true,
      showInHome: true,
    },
  },
  '/article_tag_relation': {
    component: () => import('@/views/article_tag_relation/index.vue'),
    name: 'ArticleTagRelation',
    meta: {
      titleKey: 'CMS_ROUTE_ARTICLE_TAG_RELATION',
      titleDefault: '文章标签关系',
      requiresAuth: true,
      showInHome: true,
    },
  },
  '/web_site': {
    component: () => import('@/views/web_site/index.vue'),
    name: 'WebSite',
    meta: {
      titleKey: 'CMS_ROUTE_WEB_SITE',
      titleDefault: '站点',
      requiresAuth: true,
      showInHome: true,
    },
  },
  '/article_category': {
    component: () => import('@/views/article_category/index.vue'),
    name: 'ArticleCategory',
    meta: {
      titleKey: 'CMS_ROUTE_ARTICLE_CATEGORY',
      titleDefault: '文章分类',
      requiresAuth: true,
      showInHome: true,
    },
  },
};

export function getRouteConfig(): RouteRecordRaw[] {
  return Object.entries(routeMap).map(([path, config]) => {
    const { component, name, meta } = config;
    return {
      path,
      name,
      component,
      meta: { ...meta, title: resolveRouteTitle(meta) },
    } as RouteRecordRaw;
  });
}

export function getRouteComponent(routePath: string): (() => Promise<unknown>) | undefined {
  return routeMap[routePath]?.component;
}

export function getHomeRoutes(): Array<{ path: string; title: string; name?: string }> {
  return Object.entries(routeMap)
    .filter(([path, config]) => {
      if (path === '/' || path === '/home') {
        return false;
      }
      return config.meta.showInHome === true;
    })
    .map(([path, config]) => ({
      path,
      title: resolveRouteTitle(config.meta),
      name: config.name,
    }));
}
