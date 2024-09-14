import { useGraphStore } from './graphStore'

export default () => {
  const graph = useGraphStore()
  return {
    label: 'Auto Layout',
    icon: 'pi pi-objects-column',
    items: [
      {
        label: 'Left => Right',
        command: () => {
          graph.autoLayout('LR')
        }
      },
      {
        label: 'Right => Left',
        command: () => {
          graph.autoLayout('RL')
        }
      },
      {
        label: 'Top => Bottom',
        command: () => {
          graph.autoLayout('TB')
        }
      },
      {
        label: 'Bottom => Top',
        command: () => {
          graph.autoLayout('BT')
        }
      }
    ]
  }
}
