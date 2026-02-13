import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/_authLayout')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/auth/_authLayout"!</div>
}
