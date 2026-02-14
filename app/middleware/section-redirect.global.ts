import type { ContentNavigationItem } from '@nuxt/content'

function findFirstChildPath(
  items: ContentNavigationItem[],
  targetPath: string,
): string | undefined {
  for (const item of items) {
    if (item.path === targetPath && item.children?.length) {
      return item.children[0]?.path
    }
    if (item.children) {
      const result = findFirstChildPath(item.children, targetPath)
      if (result) return result
    }
  }
}

export default defineNuxtRouteMiddleware(async (to) => {
  const path = to.path.replace(/\/$/, '') || '/'

  if (path === '/' || path === '/en') return

  const page = await queryCollection('docs_en').path(path).first()
  if (page) return

  const navigation = await queryCollectionNavigation('docs_en')
  const firstChildPath = findFirstChildPath(navigation, path)

  if (firstChildPath) {
    return navigateTo(firstChildPath, { redirectCode: 301 })
  }
})
