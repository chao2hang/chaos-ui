import fs from "node:fs";
import path from "node:path";

const resDir = "lib/i18n/resources";
const enDir = path.join(resDir, "en");
const namespaces = fs.readdirSync(enDir).filter(f => f.endsWith(".json"));

// Japanese translations for common.json
const jaCommon = {
  "confirm": "確認", "cancel": "キャンセル", "close": "閉じる", "search": "検索",
  "clear": "クリア", "select": "選択", "save": "保存", "delete": "削除",
  "apply": "適用", "copy": "コピー", "remove": "削除", "retry": "再試行",
  "back": "戻る", "next": "次へ", "previous": "前へ", "complete": "完了",
  "skip": "スキップ", "loading": "読み込み中", "noResults": "結果が見つかりません",
  "noData": "データなし", "submit": "送信", "refresh": "更新", "download": "ダウンロード",
  "upload": "アップロード", "print": "印刷", "export": "エクスポート", "import": "インポート",
  "more": "もっと見る", "less": "折りたたむ", "all": "すべて", "none": "なし",
  "selected": "選択済み", "today": "今日", "yesterday": "昨日", "ok": "OK", "done": "完了"
};

// Korean translations for common.json
const koCommon = {
  "confirm": "확인", "cancel": "취소", "close": "닫기", "search": "검색",
  "clear": "지우기", "select": "선택", "save": "저장", "delete": "삭제",
  "apply": "적용", "copy": "복사", "remove": "제거", "retry": "재시도",
  "back": "뒤로", "next": "다음", "previous": "이전", "complete": "완료",
  "skip": "건너뛰기", "loading": "로딩 중", "noResults": "결과 없음",
  "noData": "데이터 없음", "submit": "제출", "refresh": "새로고침", "download": "다운로드",
  "upload": "업로드", "print": "인쇄", "export": "내보내기", "import": "가져오기",
  "more": "더보기", "less": "접기", "all": "전체", "none": "없음",
  "selected": "선택됨", "today": "오늘", "yesterday": "어제", "ok": "확인", "done": "완료"
};

// Create ja and ko directories
for (const [lang, commonOverride] of [["ja", jaCommon], ["ko", koCommon]]) {
  const langDir = path.join(resDir, lang);
  if (!fs.existsSync(langDir)) {
    fs.mkdirSync(langDir, { recursive: true });
  }

  for (const nsFile of namespaces) {
    const targetPath = path.join(langDir, nsFile);
    if (fs.existsSync(targetPath)) continue;

    const enContent = JSON.parse(fs.readFileSync(path.join(enDir, nsFile), "utf-8"));

    if (nsFile === "common.json") {
      // Use the translated common.json
      fs.writeFileSync(targetPath, JSON.stringify(commonOverride, null, 2) + "\n");
    } else {
      // Copy English as placeholder (to be translated later)
      fs.writeFileSync(targetPath, JSON.stringify(enContent, null, 2) + "\n");
    }
  }

  console.log(`Created ${lang} locale: ${namespaces.length} namespaces`);
}
