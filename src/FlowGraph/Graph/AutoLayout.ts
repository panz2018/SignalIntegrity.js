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
          graph.autolayout('LR')
        }
      },
      {
        label: 'Right => Left',
        command: () => {
          graph.autolayout('RL')
        }
      },
      {
        label: 'Top => Bottom',
        command: () => {
          graph.autolayout('TB')
        }
      },
      {
        label: 'Bottom => Top',
        command: () => {
          graph.autolayout('BT')
        }
      }
    ]
  }
}
