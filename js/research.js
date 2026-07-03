const researchCards = [
  {
    fileNo: "FILE 01",
    title: "Unityプロジェクト設計情報抽出の研究",
    short:
      "Unityプロジェクト内のAsset、Script、Prefab、Sceneを解析し、構造情報として出力する研究です。",
    category: "Unity / Research",
    status: "PAPER / EVALUATION",
    tags: ["Unity", "C#", "AssetDatabase", "JSON"],
    problem:
      "Unityプロジェクトは規模が大きくなるほど、Script、Prefab、Scene、Componentの関係が複雑になり、全体構造の把握が難しくなるという課題があります。",
    method:
      "Unity Editor上でAssetDatabaseを用いてAsset情報を取得し、Script、Prefab、Sceneの構成要素をNode、関係性をEdgeとしてJSON形式で出力しました。",
    result:
      "Full Scan、NoAssetDetail、Partial Scanなどの解析方式を比較し、解析速度と抽出完全性のトレードオフを評価しました。",
    future:
      "今後はWebアプリ上でUnity構造情報を可視化し、設計理解や保守支援への有用性を示す予定です。",
  },
  {
    fileNo: "FILE 02",
    title: "Wi-Fi電波強度を用いた位置推定",
    short:
      "地下工事現場を想定し、Wi-FiのRSSIから作業員の位置推定を行う研究です。",
    category: "IoT / App / Research",
    status: "PROTOTYPE / TEST",
    tags: ["Android", "Wi-Fi", "RSSI", "CSV"],
    problem:
      "地下工事現場ではGPSが使いにくく、作業員の位置をリアルタイムに把握することが難しいという課題があります。",
    method:
      "Android端末で周囲のWi-Fi情報を取得し、RSSI値とCSVログを用いて、入り口からの距離や作業員の位置を推定する仕組みを作成しました。",
    result:
      "取得したWi-Fiログをもとに、地点ごとの電波強度データを読み込み、位置推定アプリとして動作確認を行いました。",
    future:
      "今後はサーバ連携やiPhone側の可視化アプリと組み合わせ、作業員位置、バイタル、環境情報を一目で確認できるシステムへ発展させます。",
  },
  {
    fileNo: "FILE 03",
    title: "CO2濃度予測と換気支援アプリ",
    short:
      "CO2濃度データをもとに、換気タイミングを支援するアプリ開発です。",
    category: "AI / App / Research",
    status: "IN PROGRESS",
    tags: ["Swift", "CO2", "AI", "Prediction"],
    problem:
      "室内環境ではCO2濃度の上昇に気づきにくく、換気のタイミングを判断しづらいという課題があります。",
    method:
      "CO2濃度データを取得・可視化し、将来的にはAIによる予測を用いて危険な環境を事前に検知する仕組みを検討しています。",
    result:
      "現段階ではAI予測を省いた形で、iPhoneアプリ上にCO2情報や換気アラートを表示する機能の実装を進めています。",
    future:
      "十分なCO2データを取得した後、予測モデルを導入し、熱中症予防や室内環境改善に活用できるシステムを目指します。",
  },
];

function initResearchCards() {
  const researchCardRow = document.getElementById("researchCardRow");
  const scrollLeftBtn = document.getElementById("researchScrollLeft");
  const scrollRightBtn = document.getElementById("researchScrollRight");

  const modal = document.getElementById("researchModal");
  const modalBg = document.getElementById("researchModalBg");
  const modalClose = document.getElementById("researchModalClose");

  const modalLabel = document.getElementById("researchModalLabel");
  const modalTitle = document.getElementById("researchModalTitle");
  const modalTags = document.getElementById("researchModalTags");
  const modalProblem = document.getElementById("researchModalProblem");
  const modalMethod = document.getElementById("researchModalMethod");
  const modalResult = document.getElementById("researchModalResult");
  const modalFuture = document.getElementById("researchModalFuture");

  if (!researchCardRow) return;

  function openResearchModal(data) {
    if (!modal) return;

    modalLabel.textContent = `${data.fileNo} / ${data.category}`;
    modalTitle.textContent = data.title;
    modalProblem.textContent = data.problem;
    modalMethod.textContent = data.method;
    modalResult.textContent = data.result;
    modalFuture.textContent = data.future;

    modalTags.innerHTML = data.tags
      .map((tag) => `<span class="research-modal-tag">${tag}</span>`)
      .join("");

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  function closeResearchModal() {
    if (!modal) return;

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  function renderResearchCards() {
    researchCardRow.innerHTML = "";

    researchCards.forEach((data) => {
      const card = document.createElement("button");
      card.className = "research-card";
      card.type = "button";

      card.innerHTML = `
        <span class="research-card-file">${data.fileNo}</span>
        <h2 class="research-card-title">${data.title}</h2>
        <p class="research-card-desc">${data.short}</p>

        <div class="research-card-tags">
          ${data.tags
            .slice(0, 3)
            .map((tag) => `<span class="research-card-tag">${tag}</span>`)
            .join("")}
        </div>

        <div class="research-card-status">${data.status}</div>
      `;

      card.addEventListener("click", () => {
        openResearchModal(data);
      });

      researchCardRow.appendChild(card);
    });
  }

  if (scrollLeftBtn) {
    scrollLeftBtn.addEventListener("click", () => {
      researchCardRow.scrollBy({
        left: -360,
        behavior: "smooth",
      });
    });
  }

  if (scrollRightBtn) {
    scrollRightBtn.addEventListener("click", () => {
      researchCardRow.scrollBy({
        left: 360,
        behavior: "smooth",
      });
    });
  }

  if (modalBg) {
    modalBg.addEventListener("click", closeResearchModal);
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeResearchModal);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeResearchModal();
    }
  });

  renderResearchCards();
}