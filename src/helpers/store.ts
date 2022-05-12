import create from 'zustand'

export interface SceneItem {
  sceneid: string
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  url: string
  type: string
}

const WXRMP_LETTERS: Array<SceneItem> = [
  {
    sceneid: 'letter-w',
    position: [-0.5939586093154078, 1.4179766180114683, -1.0540099396669986],
    rotation: [0.4012900888933387, 0.4926258017035974, -0.07625269669850249],
    scale: 0.3950373355773808,
    type: 'image',
    url: '/scenes/wxrmp/web.png',
  },
  {
    sceneid: 'letter-x',
    position: [-0.27979962831464594, 1.4319187266331803, -1.20572618527801],
    rotation: [0.36137248605184585, 0.2553470532157992, -0.08622428533263367],
    scale: 0.3035502115949525,
    type: 'image',
    url: '/scenes/wxrmp/extended.png',
  },
  {
    sceneid: 'letter-r',
    position: [0.006787547918389523, 1.4486472994127308, -1.1384421905940927],
    rotation: [0.32838485276938817, 0.01587933708709051, -0.02270193751791192],
    scale: 0.46085404884993775,
    type: 'image',
    url: '/scenes/wxrmp/reality.png',
  },
  {
    sceneid: 'letter-m',
    position: [0.8842079660281483, 1.6231226979906634, -3.5473363261903836],
    rotation: [0.1405454771695349, -0.16634077807857856, 0.026888335721205265],
    scale: 1.3935118154786572,
    type: 'image',
    url: '/scenes/wxrmp/media.png',
  },
  {
    sceneid: 'letter-p',
    position: [2.153948558371435, 1.5994152919326163, -3.6223767755136733],
    rotation: [0.15440459044967525, -0.48455655845714896, 0.04030082383543139],
    scale: 1.704243734002938,
    type: 'image',
    url: '/scenes/wxrmp/player.png',
  },
]

interface Scene {
  scene: Array<SceneItem>;
  router: String | null
}

const useStore = create<Scene>(() => ({
  router: null,
  scene: WXRMP_LETTERS
}))

export default useStore
