import PhoneFrame from './PhoneFrame'
import AppPreview, { usePreview } from './AppPreview'
import { detectIsland, islandById, promptMoments } from '../../data/product'

export default function Studio() {
  const preview = usePreview()
  const guess = preview.draft.trim() ? detectIsland(preview.draft) : null
  const target = guess ? islandById(guess, preview.islands) : null

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div>
        <p className="text-sm font-semibold tracking-[0.18em] text-[#3d7ec4]">亲手试一次</p>
        <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">
          说出生活。
          <br />
          让故事自己找到岛。
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-mist">
          这是按当前 App 做的可操作预览：文字、语音、照片和心情会合成一则故事，见证者把它安放到对应的故事岛，岛屿等级往前长一格。你不用先选择分类。
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {promptMoments.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                preview.setDraft(item.text)
                preview.setScreen('write')
              }}
              className="rounded-full border border-ink/10 bg-white px-3 py-1.5 text-sm text-ink transition hover:border-sky/50"
            >
              {item.label}
            </button>
          ))}
        </div>

        <label className="mt-5 block">
          <span className="text-xs font-semibold text-mist">或者写你自己的一行</span>
          <textarea
            value={preview.draft}
            onChange={(event) => preview.setDraft(event.target.value)}
            rows={3}
            placeholder="不必是大事。一行也可以。"
            className="mt-2 w-full resize-none rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm leading-relaxed outline-none ring-sky/30 focus:ring-2"
          />
        </label>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={!preview.draft.trim() || preview.phase === 'placing' || preview.phase === 'flying'}
            onClick={() => preview.place()}
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
          >
            {preview.phase === 'idle' || preview.phase === 'landed' ? '安放进世界' : '正在安放…'}
          </button>
          <button type="button" className="rounded-full px-3 py-2 text-sm text-mist hover:text-ink" onClick={() => preview.setScreen('mood')}>
            看这周心情
          </button>
          <button type="button" className="rounded-full px-3 py-2 text-sm text-mist hover:text-ink" onClick={() => preview.setScreen('memory')}>
            回到去年今天
          </button>
        </div>

        <ol className="mt-8 space-y-3 text-sm leading-relaxed text-ink/80">
          <li className="flex gap-3">
            <Step n="1" />
            <span>故事进岛之前，可以是文字，也可以补一段语音或一张照片。心情只是当时的天气，不是成绩。</span>
          </li>
          <li className="flex gap-3">
            <Step n="2" />
            <span>
              {target
                ? `按你刚写的内容，这一则会落到${target.name}岛。外圈建筑是「${target.firstBuilding}」，走得够远才会看见「${target.landmark}」。`
                : '见证者根据内容安放：学习、健康、人际、生活、工作、情感……一共十一座故事岛。'}
            </span>
          </li>
          <li className="flex gap-3">
            <Step n="3" />
            <span>光点飞过去之后，岛会升高一级。主岛仍在中间，你回来先看见的是家，不是任务列表。</span>
          </li>
        </ol>
      </div>

      <PhoneFrame label="右侧可以直接点：写下、点开一座岛、看心情，或回到去年的今天。">
        <AppPreview preview={preview} />
      </PhoneFrame>
    </div>
  )
}

function Step({ n }: { n: string }) {
  return (
    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#e7f3ff] text-xs font-semibold text-[#3d7ec4]">
      {n}
    </span>
  )
}

export function HeroPhone() {
  const preview = usePreview()
  return (
    <PhoneFrame label="打开后先看见主岛、故事岛，和今天已经留下的故事。">
      <AppPreview preview={preview} />
    </PhoneFrame>
  )
}
