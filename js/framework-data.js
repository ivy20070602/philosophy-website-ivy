const FRAMEWORKS = {
  mind: {
    title: "Philosophy of Mind",
    subtitle: "Framework of Major Schools of Thought",
    intro: "哲学心灵论的核心问题：心灵的本质是什么？心灵现象如何与物理世界相关？根据对这一问题（尤其是心灵与身体/物质的关系）的回答，形成了不同的流派。",
    schools: [
      {
        id: "dualism",
        name: "Dualism 二元论",
        color: "#8b5cf6",
        base: "划分依据：心灵与身体是两种根本不同的实体。据'本质是否相同'，答案是否定——心灵非物质。",
        philosophers: ["René Descartes (笛卡尔, 1596-1650)", "Gottfried Leibniz (莱布尼茨)", "Nicolas Malebranche (马勒布朗士)", "David Chalmers (查尔默斯)"],
        view: "心灵与物质是两类不同的实体/属性。心灵是思维、非广延的；物质是广延的。二者无法等同或还原为彼此。",
        arguments: [
          { name: "Cogito Ergo Sum / 我思故我在", desc: "我可以怀疑一切物质事物存在，但无法怀疑'我在思考'。因此思考的我与物质的身体是不同实体（Descartes）。" },
          { name: "Conceivability Argument / 可设想论证", desc: "出物理上完全同一的'僵尸'是可能的（可设想），因此心灵并非物理（Chalmers）。" },
          { name: "Mary's Room / 玛丽房间", desc: "玛丽知道全部物理知识，但首次见到红色时学到新东西。物理知识不完备，故心灵不还原为物理。" },
          { name: "Epiphenomenal Qualia", desc: "物理事实不蕴涵现象事实。现象性质是物理世界之外的额外事实。" }
        ],
        agrees: [],
        opposes: ["physicalism", "behaviorism", "identity", "eliminativism", "functionalism"]
      },
      {
        id: "physicalism",
        name: "Physicalism 物理主义",
        color: "#3b82f6",
        base: "划分依据：心灵本质是物质的。凡存在之物皆为物理实体/属性。",
        philosophers: ["D. M. Armstrong", "J. J. C. Smart", "U. T. Place", "Jaegwon Kim"],
        view: "心灵状态就是（或依赖于）物理脑状态。不存在脱离物理的心灵实体。物理因果封闭：物理事件只需物理原因即可充分解释。",
        arguments: [
          { name: "Parsimony / 精简原则(Ockham)", desc: "不要无故增加实体。能用脑状态解释一切，就无需额外假设心灵实体。" },
          { name: "Causal Closure / 因果封闭", desc: "物理学是因果封闭的，每个物理事件都有物理原因。非物理心灵无法影响物理世界，故心灵不可能是非物理的。" },
          { name: "Neuroscientific Correlation", desc: "神经科学高度相关表明心灵状态与脑状态共变，最简洁解释是同一。" }
        ],
        agrees: ["identity", "functionalism"],
        opposes: ["dualism", "idealism"]
      },
      {
        id: "idealism",
        name: "Idealism 观念论",
        color: "#f59e0b",
        base: "划分依据：与物理主义相反——不仅没有非物质心灵之外的东西，甚至连物质本身也是心灵的观念。",
        philosophers: ["George Berkeley (贝克莱)", "Immanuel Kant (康德)"],
        view: "存在即被感知(esse est percipi)。物质对象只是不同观念在心灵中的聚集。只有心灵及其观念存在。",
        arguments: [
          { name: "Primary/Secondary Qualities", desc: "笛卡尔把颜色等次要性质归于心灵，但贝克莱指出：没有理由认为形状运动等'第一性质'也在心灵之外，它们只能被感知而有。" },
          { name: "Mastership Objection", desc: "你不能设想一个不被感知而存在的物质对象，因为你一旦设想它，它就在你心中被设想了。" }
        ],
        agrees: [],
        opposes: ["physicalism", "behaviorism", "functionalism", "identity"]
      },
      {
        id: "behaviorism",
        name: "Behaviorism 行为主义",
        color: "#06b6d4",
        base: "划分依据：意义/科学标准——心灵概念的意义可由可观察行为分析。传统内在心灵是'无意义'的。",
        philosophers: ["Gilbert Ryle (赖尔)", "Ludwig Wittgenstein (维特根斯坦)", "B. F. Skinner (斯金纳)"],
        view: "心理谓词可分析为行为或行为倾向。'疼'就是表现出或倾向表现出某些行为，而非内在的神秘状态。心智是'机器中的幽灵'(ghost in the machine)。",
        arguments: [
          { name: "Category Mistake / 范畴错误", desc: "Ryle：把心灵看作实体是把心理谓词误当作指涉实体的词，犯了范畴错误。" },
          { name: "Other Minds / 他心问题", desc: "若心灵是行为之外的秘密内在状态，我们就无法知道他人之心；把心灵行为化则消解了此问题。" },
          { name: "Private Language / 私人语言", desc: "Wittgenstein：'疼'若只指私人内在感受，则不能成为有公共规则的语言。" }
        ],
        agrees: ["identity"],
        opposes: ["dualism", "idealism"]
      },
      {
        id: "identity",
        name: "Identity Theory 同一论(心脑同一)",
        color: "#10b981",
        base: "划分依据：与行为主义相对——内在状态真实存在；与二元论相对——它们就是脑状态。据'心理状态=脑状态'。",
        philosophers: ["U. T. Place", "J. J. C. Smart", "D. M. Armstrong"],
        view: "每一种心理状态类型与某种脑状态类型同一。疼=C类纤维放电。心灵就是大脑。",
        arguments: [
          { name: "Parsimony", desc: "同一论比二元论更精简：不假设额外实体。" },
          { name: "Science / 科学类比", desc: "正如温度=分子平均动能、闪电=放电，心理状态最终会被神经科学鉴别为脑状态。" },
          { name: "Leibniz's Law检验", desc: "严格同一需满足莱布尼茨律；反驳者称心物性质不同故不可同一——同一论者回应这是'现象学谬误'。" }
        ],
        agrees: ["behaviorism", "physicalism"],
        opposes: ["dualism", "functionalism", "eliminativism"]
      },
      {
        id: "functionalism",
        name: "Functionalism 功能主义",
        color: "#f97316",
        base: "划分依据：同一论混淆'种类-类型'；心理状态由'功能角色'（输入输出及内在关系）定义，而非由物理实现定义。",
        philosophers: ["Hilary Putnam (普特南)", "Jerry Fodor", "Daniel Dennett", "Ned Block"],
        view: "心理状态 = 具有特定因果/功能角色的状态。同一心理状态可被不同物理系统实现(多重可实现)。心灵如同软件，大脑如同硬件。",
        arguments: [
          { name: "Multiple Realizability / 多重可实现", desc: "人、章鱼、外星人、机器都可有'疼'，但物理结构不同。故心理概念不能还原为特定物理状态。" },
          { name: "Machine Functional States", desc: "Putnam：心理状态即'机器表'状态——由输入输出及与其他状态的转换关系定义，与具体物质无关。" },
          { name: "Turing Test", desc: "行为上不可区分的机器也应被认为有心灵。" }
        ],
        agrees: ["physicalism"],
        opposes: ["identity", "eliminativism", "dualism", "behaviorism"]
      },
      {
        id: "eliminativism",
        name: "Eliminativism 取消主义",
        color: "#ef4444",
        base: "划分依据：对'常识心理学(folk psychology)'的根本怀疑——它不是需要还原的理论而是错误的理论。",
        philosophers: ["Paul Churchland", "Patricia Churchland"],
        view: "信念、欲望等常识心理概念是错误理论的一部分，成熟神经科学将像淘汰燃素一样'取消'它们。它们不存在。",
        arguments: [
          { name: "Theory Theory / 理论观", desc: "常识心理学是一个经验理论（与科学理论性质相同），而理论可被更好的理论取代/淘汰。" },
          { name: "Historical Precedent / 历史先例", desc: "如'燃素''以太''天神'曾被取消，常识心理范畴也如此。" },
          { name: "Self-Refutation Objection", desc: "反驳者：取消论主张'没有信念'——但它自己就是一个信念，故自相矛盾。" }
        ],
        agrees: [],
        opposes: ["functionalism", "dualism", "behaviorism", "identity"]
      },
      {
        id: "consciousness",
        name: "The Hard Problem 意识难题",
        color: "#a855f7",
        base: "划分依据：上述物理主义流派大多避开'主观经验'(qualia)。意识难题聚焦于'为什么物理过程产生主观经验'。",
        philosophers: ["David Chalmers", "Thomas Nagel", "Frank Jackson", "Joseph Levine"],
        view: "功能与物理的解释无法说明'是什么感觉'(what it's like)。现象意识是'困难问题'，仍需解释。",
        arguments: [
          { name: "Explanatory Gap / 解释鸿沟", desc: "物理/功能信息与现象信息之间存在无法跨越的鸿沟(Levine)。" },
          { name: "Zombie Argument / 僵尸论证", desc: "物理复制品而无意识是可设想的，故意识非物理(Chalmers)。" },
          { name: "What Is It Like to Be a Bat? / 蝙蝠是什么感觉", desc: "即使知道蝙蝠的全部物理事实，我们仍不知做蝙蝠是何感觉(Nagel)。" }
        ],
        agrees: ["dualist-lean"],
        opposes: ["functionalism", "behaviorism", "eliminativism"]
      }
    ],
    relations: [
      { from: "dualism", to: "physicalism", type: "oppose", note: "本质不同 vs 本质相同" },
      { from: "dualism", to: "identity", type: "oppose", note: "两实体 vs 同一" },
      { from: "physicalism", to: "idealism", type: "oppose", note: "万事皆物 vs 万事皆心" },
      { from: "behaviorism", to: "dualism", type: "oppose", note: "行为 vs 内在实体" },
      { from: "behaviorism", to: "idealism", type: "oppose", note: "公共行为 vs 私有观念" },
      { from: "identity", to: "functionalism", type: "oppose", note: "类型同一 vs 功能角色" },
      { from: "functionalism", to: "eliminativism", type: "oppose", note: "保留真实心理状态 vs 取消" },
      { from: "eliminativism", to: "consciousness", type: "oppose", note: "拒绝qualia vs 重视qualia" },
      { from: "physicalism", to: "identity", type: "agree", note: "心灵是物理的" },
      { from: "physicalism", to: "functionalism", type: "agree", note: "心灵在本体论上是物理的" },
      { from: "behaviorism", to: "identity", type: "agree", note: "都反对二元论/内在神秘实体" },
      { from: "consciousness", to: "dualism", type: "agree", note: "都认为现象性质超出物理" }
    ]
  },

  metaphysics: {
    title: "Metaphysics",
    subtitle: "Framework of Major Debates",
    intro: "形而上学的核心问题：存在什么？存在物的基本范畴、关系与结构。各流派根据对特定子问题（本体论、时间、持存、模态、因果、自由意志）的回答而区分。",
    schools: [
      {
        id: "ontology",
        name: "Ontology 本体论",
        color: "#6366f1",
        base: "划分依据：研究'存在什么'。根据确定存在承诺的方法区分。",
        philosophers: ["W. V. O. Quine (蒯因)", "Peter van Inwagen", "David Lewis"],
        view: "本体论承诺由最佳理论中'存在量化变项之值'决定。存在 = 成为变项的值。",
        arguments: [
          { name: "To Be Is to Be a Value of a Variable", desc: "我们承诺于某实体，当且仅当它必须作为我们最佳理论中约束变项的值而存在(Quine)。" },
          { name: "Ockham's Razor / 奥卡姆剃刀", desc: "不要无故增加实体。在解释力相同的前提下选择更简单的本体论。" },
          { name: "Method of Paraphrase", desc: "通过改写/释义(paraphrase)消除表面上的存在承诺。" }
        ],
        agrees: [],
        opposes: ["critique"]
      },
      {
        id: "abstract",
        name: "Abstract vs Concrete 抽象/具体",
        color: "#a855f7",
        base: "划分依据：除物理具体事物外，是否存在无时空位置的抽象实体（数、性质、命题）？",
        philosophers: ["Plato (柏拉图)", "Gottlob Frege", "David Lewis", "Richard Rorty"],
        view: "实在论：抽象实体真实存在且心灵独立；唯名论：只有具体个别事物存在。",
        arguments: [
          { name: "One Over Many / 一多于多", desc: "许多红色事物共享'红'。需要一个共相(universal)来解释这种相似(柏拉图)。" },
          { name: "Benacerraf's Dilemma / 贝纳塞拉夫两难", desc: "若数等抽象对象存在，我们（纯物理存在物）如何认识它们？要么无法认识，要么它们不存在。" },
          { name: "Nominalism", desc: "共相/抽象实体只是语言惯习或有用虚构，非真实存在。" }
        ],
        agrees: [],
        opposes: []
      },
      {
        id: "material",
        name: "Material Objects 物质对象",
        color: "#f59e0b",
        base: "划分依据：构成条件(spatial composition)与持存标准——何时部分构成整体、对象如何存在于时空中。",
        philosophers: ["Peter van Inwagen", "David Lewis", "Theodore Sider", "Mark Heller"],
        view: "关于'何时构成'有虚无主义(无复合物)、普遍主义(任何集合皆构成)等不同立场。",
        arguments: [
          { name: "Special Composition Question", desc: "在什么条件下若干部分构成一个整体对象？答案：从不/有时/总是。" },
          { name: "Ship of Theseus / 忒修斯之船", desc: "更换所有木板后是否同一？引发同一性标准的争论。" },
          { name: "Temporary Intrinsics / 暂时内在性质", desc: "同一对象在不同时间有不同性质，四维主义用'时间部分'解释。" }
        ],
        agrees: [],
        opposes: []
      },
      {
        id: "time",
        name: "Time 时间",
        color: "#0ea5e9",
        base: "划分依据：过去/现在/未来是否客观真实？时间是否真正流逝？",
        philosophers: ["Arthur Prior", "J. M. E. McTaggart", "Hilary Putnam", "D. H. Mellor"],
        view: "A理论：过去现在未来是客观的，现在被优待；B理论：只有'早于/晚于'关系，所有时间等量真实。",
        arguments: [
          { name: "McTaggart's Paradox / 麦塔格悖论", desc: "时间性质(过去/现在/未来)相互矛盾，且无法一致地归诸同一事件。由此论证真实时间不存在。" },
          { name: "Special Relativity / 狭义相对论", desc: "同时性相对，无宇宙普遍'现在'，支持B理论。" },
          { name: "Truthmaker / 真值制造", desc: "B理论需要回答：若过去对象不存在，'恐龙存在过'何以成真？" }
        ],
        agrees: [],
        opposes: []
      },
      {
        id: "persistence",
        name: "Persistence 持存",
        color: "#10b981",
        base: "划分依据：对象如何随时间变化而持续存在？据'是否具有时间部分'区分。",
        philosophers: ["David Lewis", "Theodore Sider", "Sally Haslanger", "Katherine Hawley"],
        view: "持续论(endurantism)：对象整体出现在每个时刻；延存论(perdurantism)：对象是四维时空块，具时间部分。",
        arguments: [
          { name: "Four-Dimensionalism / 四维主义", desc: "对象是时空块，具不同时间截段。变化=不同时间部分有不同性质，解决暂时内在性质问题。" },
          { name: "Losing and Gaining Parts", desc: "持续论需说明一个对象如何在获得/失去部分后仍同一。" }
        ],
        agrees: [],
        opposes: []
      },
      {
        id: "modality",
        name: "Modality 模态（可能性/必然性）",
        color: "#ef4444",
        base: "划分依据：如何理解'可能'与'必然'？据可能世界是否真实存在区分。",
        philosophers: ["David Lewis", "Saul Kripke (克里普克)", "Alvin Plantinga", "Robert Stalnaker"],
        view: "模态实在论(Lewis)：可能世界是真实的；现实论(ersatz / Kripke)：可能世界是抽象表征。",
        arguments: [
          { name: "Possible Worlds Analysis", desc: "命题P可能 = P在一些可能世界真；P必然 = P在所有可能世界真。" },
          { name: "Kripke's Rigid Designators / 严格指示词", desc: "专名在所有可能世界指称同一对象，由此论证本质主义与后天必然真理。" },
          { name: "Incredulous Stare / 难以置信的凝视", desc: "对模态实在论的反驳：不会真有人相信存在无数真实的具体世界。" }
        ],
        agrees: [],
        opposes: []
      },
      {
        id: "causation",
        name: "Causation 因果",
        color: "#14b8a6",
        base: "划分依据：因果联结的本质——是意义上的规则性/反事实依赖，还是物理世界中的真实力量？",
        philosophers: ["David Hume (休谟)", "David Lewis", "Donald Davidson", "Nancy Cartwright"],
        view: "休谟式还原论：因果是恒定联结+时间在先；反事实论：因果=反事实依赖；力量论：因果是真实因果力量之行使。",
        arguments: [
          { name: "Hume's Empiricism / 休谟经验主义", desc: "经验中只见恒常联结，不见'必然联系'。因果只是习惯性联想。" },
          { name: "Counterfactual Theory / 反事实理论(Lewis)", desc: "C引起E 当且仅当 若C不发生E也不发生。" },
          { name: "Problem of Preemption / 抢先问题", desc: "反事实论的反例：备用原因被抢先，使反事实依赖失败的例子。" }
        ],
        agrees: [],
        opposes: []
      },
      {
        id: "freewill",
        name: "Free Will 自由意志",
        color: "#f43f5e",
        base: "划分依据：若决定论为真，自由意志是否可能？据'自由是否需要非决定论'区分。",
        philosophers: ["David Hume", "Harry Frankfurt", "Robert Kane", "Derk Pereboom"],
        view: "相容论：自由与决定论相容；自由主义：自由需非决定论；怀疑论/强硬决定论：自由是幻觉。",
        arguments: [
          { name: "Compatibilist / 相容论", desc: "自由 = 欲求未被外部约束地行动，而无须'本来能够另做'。" },
          { name: "Frankfurt Cases", desc: "即使无法另做，只要出于自己的欲求行动，就仍自由(Frankfurt)。" },
          { name: "Luck Objection / 运气反驳", desc: "若选择非决定，则是随机的'运气'，不算真正的自由(对自由主义的反驳)。" }
        ],
        agrees: [],
        opposes: []
      },
      {
        id: "critique",
        name: "Critiques of Metaphysics 对形而上学的批判",
        color: "#64748b",
        base: "划分依据：形而上学本身是否合法？据'是否承认形而上学问题有意义'区分。",
        philosophers: ["Rudolf Carnap (卡尔纳普)", "W. V. O. Quine", "Peter F. Strawson"],
        view: "逻辑实证主义：形而上问题是无意义的伪问题；自然主义(Quine)：形而上学与科学连续。",
        arguments: [
          { name: "Verification Principle / 证实原则", desc: "只有经验可证实或逻辑上可分析才有意义。形而上学命题皆不可证实，故无意义(Carnap)。" },
          { name: "Internal vs External / 内在与外在问题", desc: "框架内问题是'内在'有意义的；关于框架本身的问题是'外在'无意义的。" },
          { name: "Self-Refutation", desc: "反驳Carnap：证实原则自身既不可证实也非分析，故自我反驳。" }
        ],
        agrees: [],
        opposes: ["ontology"]
      }
    ],
    relations: [
      { from: "critique", to: "ontology", type: "oppose", note: "形而上学无意义 vs 形而上学有意义" },
      { from: "ontology", to: "critique", type: "oppose", note: "肯定形而上学 vs 否定" },
      { from: "abstract", to: "ontology", type: "agree", note: "都是本体论问题" },
      { from: "material", to: "persistence", type: "agree", note: "物质对象的持存问题相互关联" },
      { from: "material", to: "time", type: "agree", note: "物质对象随时间存在，需说明时间结构" },
      { from: "time", to: "persistence", type: "agree", note: "时间理论决定对象如何随时持存" },
      { from: "causation", to: "freewill", type: "agree", note: "因果本质影响自由意志与决定论之争" },
      { from: "modality", to: "causation", type: "agree", note: "反事实因果分析依赖模态（可能世界）" }
    ]
  }
};
