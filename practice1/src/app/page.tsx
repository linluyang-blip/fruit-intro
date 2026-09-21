import Image from "next/image";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import Parallax from "./components/Parallax";
import SubscribeForm from "./components/SubscribeForm";

const fruits = [
  {
    emoji: "🥭",
    name: "愛文芒果",
    origin: "屏東枋山 · 台南玉井",
    season: "5 月 – 7 月",
    desc: "皮薄多汁、蜜香濃郁，果肉幾乎沒有纖維，是台灣夏天的代表味道。",
    tag: "外銷冠軍",
    images: ["/images/mango.jpg", "/images/mango-1.jpg", "/images/mango-2.jpg"],
  },
  {
    emoji: "🍍",
    name: "金鑽鳳梨",
    origin: "台南關廟 · 屏東高樹",
    season: "3 月 – 6 月",
    desc: "糖酸比例平衡、芯也能吃，入口不咬舌，冬季還有更甜的「冬蜜」風味。",
    tag: "四季供應",
    images: ["/images/pineapple.jpg"],
  },
  {
    emoji: "🍈",
    name: "台東釋迦",
    origin: "台東太麻里 · 卑南",
    season: "11 月 – 隔年 2 月",
    desc: "鳳梨釋迦綿密如冰淇淋，甜度可達 25 度以上，冷藏後風味更集中。",
    tag: "冬季限定",
    images: ["/images/sugar-apple.jpg"],
  },
  {
    emoji: "🍎",
    name: "黑珍珠蓮霧",
    origin: "屏東林邊 · 南州",
    season: "12 月 – 隔年 4 月",
    desc: "海口地培育出的深紅色澤，果肉扎實、清脆爆汁，甜中帶著淡淡鹹香。",
    tag: "產地直送",
    images: ["/images/wax-apple.jpg"],
  },
  {
    emoji: "🌸",
    name: "玉荷包荔枝",
    origin: "高雄大樹 · 屏東里港",
    season: "5 月 – 6 月",
    desc: "核小肉厚、香氣高雅，產季僅短短數週，是識貨老饕每年必等的味道。",
    tag: "季節稀有",
    images: ["/images/lychee.jpg"],
  },
  {
    emoji: "🍇",
    name: "巨峰葡萄",
    origin: "彰化大村 · 苗栗卓蘭",
    season: "6 月 – 7 月 / 11 月 – 12 月",
    desc: "一年兩收，果粒飽滿、果粉自然，帶有濃厚的玫瑰香與恰到好處的酸度。",
    tag: "一年兩收",
    images: ["/images/grape.jpg"],
  },
  {
    emoji: "🍌",
    name: "北蕉",
    origin: "南投竹山 · 高雄旗山",
    season: "全年 · 5 月 – 9 月盛產",
    desc: "台灣蕉甜度高、口感綿密，早年更曾是外銷日本的黃金水果。",
    tag: "國民水果",
    images: ["/images/banana.jpg"],
  },
  {
    emoji: "🐲",
    name: "紅肉火龍果",
    origin: "台南 · 高雄燕巢",
    season: "6 月 – 11 月",
    desc: "紅肉品種帶有淡雅果香、富含花青素，切片擺盤總是特別吸睛。",
    tag: "夏季消暑",
    images: ["/images/dragon-fruit.jpg"],
  },
  {
    emoji: "🍏",
    name: "珍珠芭樂",
    origin: "彰化員林 · 高雄燕巢",
    season: "全年 · 冬季最清甜",
    desc: "籽少肉脆、清爽無負擔，是台灣人愛不釋手的國民水果之一。",
    tag: "全年供應",
    images: ["/images/guava.jpg"],
  },
  {
    emoji: "🍉",
    name: "大西瓜",
    origin: "雲林大西 · 花蓮玉里",
    season: "5 月 – 8 月",
    desc: "多汁清甜、消暑解渴，夏天餐桌上不可或缺的沁涼滋味。",
    tag: "夏日消暑",
    images: ["/images/watermelon.jpg"],
  },
];

const seasons = [
  { months: "春", items: "金鑽鳳梨 · 珍珠芭樂 · 桶柑" },
  { months: "夏", items: "愛文芒果 · 玉荷包荔枝 · 西瓜 · 火龍果" },
  { months: "秋", items: "文旦柚 · 巨峰葡萄 · 木瓜 · 百香果" },
  { months: "冬", items: "台東釋迦 · 黑珍珠蓮霧 · 茂谷柑 · 草莓" },
];

const stats = [
  { value: "40+", label: "外銷國家與地區" },
  { value: "全年", label: "皆有當季鮮果" },
  { value: "300m+", label: "從平地到高山的產區落差" },
  { value: "#1", label: "亞洲人均水果消費前段班" },
];

const stampRotations = [-6, 5, 4, -5, -3, 6, 3, -4, 5, -2];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main>
        {/* 主視覺 */}
        <section className="relative mx-auto grid max-w-6xl gap-16 overflow-x-hidden px-6 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <Parallax
            speed={0.12}
            className="pointer-events-none absolute -left-24 top-0 -z-10 h-72 w-72 rounded-full bg-terracotta/20 blur-3xl"
          />
          <Parallax
            speed={-0.18}
            className="pointer-events-none absolute -right-16 top-40 -z-10 h-80 w-80 rounded-full bg-forest/15 blur-3xl"
          />

          <div className="flex flex-col gap-7">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-terracotta-deep">
              <span className="h-px w-8 bg-terracotta" />
              Taiwan · Kingdom of Fruits
            </div>
            <h1 className="font-serif text-4xl font-bold leading-[1.2] tracking-tight sm:text-5xl lg:text-6xl">
              水果王國的一整年，
              <br />
              <span className="text-terracotta">都是產季。</span>
            </h1>
            <p className="max-w-xl text-lg leading-8 text-ink-soft">
              北回歸線橫越、海拔落差超過三千公尺，讓台灣在同一座島上種出熱帶到溫帶的水果。
              從屏東的芒果田到梨山的高冷果園，這裡整理了最值得一嚐的當季鮮果。
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <a
                href="#fruits"
                className="border border-ink bg-ink px-7 py-3 text-sm font-medium tracking-wide text-cream transition hover:bg-terracotta hover:border-terracotta"
              >
                探索當季水果
              </a>
              <a
                href="#seasons"
                className="group flex items-center gap-2 text-sm font-medium tracking-wide text-ink"
              >
                看看產季月曆
                <span className="transition group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>

          <Parallax
            speed={0.08}
            className="mx-auto grid w-full max-w-md grid-cols-3 gap-4 sm:mx-0"
          >
            {fruits.map((f, i) => (
              <div
                key={f.name}
                className="flex flex-col items-center gap-2 border border-line bg-paper px-2 py-4 text-center shadow-[4px_4px_0_var(--color-line)]"
                style={{ transform: `rotate(${stampRotations[i % stampRotations.length]}deg)` }}
              >
                <div className="relative h-14 w-14 overflow-hidden rounded-full border border-line">
                  <Image
                    src={f.images[0]}
                    alt={f.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <span className="text-xs font-medium text-ink">{f.name}</span>
              </div>
            ))}
          </Parallax>
        </section>

        {/* 數據列 */}
        <section className="border-y border-line bg-paper">
          <div className="mx-auto grid max-w-6xl divide-y divide-line px-6 sm:grid-cols-4 sm:divide-x sm:divide-y-0 sm:px-8">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1 px-2 py-8 text-center">
                <div className="font-serif text-3xl font-bold text-terracotta">{s.value}</div>
                <div className="text-xs uppercase tracking-wide text-ink-soft">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 當季水果 */}
        <section id="fruits" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 sm:px-8">
          <div className="mb-14 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.3em] text-terracotta-deep">Seasonal Selection</span>
            <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              當季精選水果
            </h2>
            <p className="max-w-2xl text-ink-soft">
              每一項都標註主要產地與產季，讓你在對的時間，吃到最好的味道。
            </p>
          </div>

          <div className="divide-y divide-line border-y border-line">
            {fruits.map((f, i) => (
              <div
                key={f.name}
                className="grid gap-4 py-8 sm:grid-cols-[3.5rem_1fr] sm:gap-6"
              >
                <div className="font-serif text-3xl text-line sm:text-4xl">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="grid gap-4 sm:grid-cols-[8rem_1fr] sm:gap-8">
                  <div
                    className={`grid gap-1 ${f.images.length > 1 ? "grid-cols-3" : "grid-cols-1"}`}
                  >
                    {f.images.map((src) => (
                      <div
                        key={src}
                        className="relative aspect-square overflow-hidden border border-line bg-paper"
                      >
                        <Image
                          src={src}
                          alt={f.name}
                          fill
                          sizes="128px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-3">
                      <h3 className="font-serif text-2xl font-bold">
                        <span className="mr-1">{f.emoji}</span>
                        {f.name}
                      </h3>
                      <span className="border border-terracotta-deep/30 px-2 py-0.5 text-[11px] uppercase tracking-wide text-terracotta-deep">
                        {f.tag}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-xs uppercase tracking-wide text-ink-soft">
                      <span>產地・{f.origin}</span>
                      <span>產季・{f.season}</span>
                    </div>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-soft">{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 產季月曆 */}
        <section id="seasons" className="relative overflow-x-hidden border-t border-line bg-paper">
          <Parallax
            speed={0.12}
            className="pointer-events-none absolute -left-16 top-10 -z-10 h-72 w-72 rounded-full bg-forest/10 blur-3xl"
          />
          <Parallax
            speed={-0.1}
            className="pointer-events-none absolute -right-20 bottom-0 -z-10 h-80 w-80 rounded-full bg-terracotta/10 blur-3xl"
          />
          <div className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 sm:px-8">
            <div className="mb-14 flex flex-col gap-3">
              <span className="text-xs uppercase tracking-[0.3em] text-terracotta-deep">Harvest Calendar</span>
              <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
                四季產季月曆
              </h2>
              <p className="max-w-2xl text-ink-soft">
                什麼時候買什麼最划算？跟著季節走就對了。
              </p>
            </div>

            <div className="grid divide-y divide-line border border-line sm:grid-cols-4 sm:divide-x sm:divide-y-0">
              {seasons.map((s) => (
                <div key={s.months} className="flex flex-col gap-4 p-8">
                  <div className="font-serif text-4xl font-bold text-terracotta">{s.months}</div>
                  <div className="h-px w-full bg-line" />
                  <p className="text-sm leading-7 text-ink-soft">{s.items}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 關於 */}
        <section id="about" className="relative mx-auto max-w-6xl scroll-mt-24 overflow-x-hidden px-6 py-24 sm:px-8">
          <Parallax
            speed={0.15}
            className="pointer-events-none absolute -right-20 top-10 -z-10 h-72 w-72 rounded-full bg-terracotta/10 blur-3xl"
          />
          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex flex-col gap-5">
              <span className="text-xs uppercase tracking-[0.3em] text-terracotta-deep">Why Taiwan</span>
              <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
                為什麼台灣的水果特別好吃？
              </h2>
              <p className="leading-8 text-ink-soft">
                北回歸線正好穿過嘉義與花蓮，讓台灣同時擁有熱帶與亞熱帶氣候；
                中央山脈把海拔一路拉到近四千公尺，於是平地種芒果、鳳梨，
                高山種水蜜桃、蜜蘋果與高冷梨。
              </p>
              <p className="leading-8 text-ink-soft">
                加上農民數十年的品種改良與細緻管理，同一種水果往往有好幾個
                風味不同的品系，甜度、香氣、口感都能挑。
              </p>
            </div>
            <div className="grid grid-cols-1 gap-px border border-line bg-line self-start sm:grid-cols-2">
              {[
                { t: "北回歸線", d: "熱帶與亞熱帶交界" },
                { t: "3,000m+", d: "海拔落差造就多樣產區" },
                { t: "品種改良", d: "數十年育種成果" },
                { t: "產地直送", d: "從果園到餐桌只要一天" },
              ].map((x) => (
                <div key={x.t} className="bg-cream p-6">
                  <div className="font-serif text-lg font-bold">{x.t}</div>
                  <div className="mt-1 text-xs text-ink-soft">{x.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA / 聯絡 */}
        <section id="contact" className="relative scroll-mt-24 overflow-x-hidden bg-forest text-cream">
          <Parallax
            speed={0.1}
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-96 w-96 rounded-full bg-terracotta/15 blur-3xl"
          />
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-24 text-center sm:px-8">
            <span className="text-xs uppercase tracking-[0.3em] text-cream/50">Stay in Touch</span>
            <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              想把寶島的甜帶回家？
            </h2>
            <p className="max-w-xl text-cream/70">
              留下你的 Email，當季鮮果一上市就通知你，還有產地小農的第一手消息。
            </p>
            <SubscribeForm />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
