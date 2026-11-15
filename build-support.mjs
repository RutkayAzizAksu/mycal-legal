// Builds the support page in the six app languages from the texts below. The <head> (styles) is taken from the
// existing support.html, so the look stays where it is edited. Run: node build-support.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const EMAIL = 'mycalfitt@gmail.com';
const PRIVACY = 'privacy-policy.html';
const FILE = { tr: 'support.html', en: 'support-en.html', de: 'support-de.html', fr: 'support-fr.html', ja: 'support-ja.html', ko: 'support-ko.html' };
const NAME = { tr: 'Türkçe', en: 'English', de: 'Deutsch', fr: 'Français', ja: '日本語', ko: '한국어' };

const T = {
  tr: {
    title: 'MyCal Destek', eyebrow: 'Destek Merkezi', h1: 'MyCal ile ilgili yardım',
    lede: 'Sık sorulan soruların yanıtları aşağıda. Aradığını bulamazsan doğrudan bize yaz.',
    faqTitle: 'Sık Sorulan Sorular',
    faq: [
      ['MyCal nedir?', 'MyCal, günlük kalori ve besin değerlerini takip etmeni sağlayan bir uygulamadır. Yediğinin fotoğrafını çekerek, sesle söyleyerek, barkod okutarak ya da elle arayarak öğün ekleyebilirsin. Su, adım, kilo, döngü takibi ve uzmanlarla çalışma da uygulamanın içindedir.'],
      ['Fotoğraftan analiz nasıl çalışır?', 'Çektiğin fotoğraf yapay zekâ modeline gönderilir; yemeğin adı, porsiyonu, kalorisi ve makroları birkaç saniyede gelir. Kaydetmeden önce rakamları düzeltebilirsin; düzeltmelerin sonraki tahminleri sana göre ayarlar. Her gün bir analiz ücretsizdir, MyCal Plus ile sınırsızdır. Sonuçlar tahmindir, tıbbi tavsiye değildir.'],
      ['MyCal Plus neler sunuyor?', 'Sınırsız fotoğraf analizi, menü ve besin etiketi tarama, sınırsız sesli kayıt ve günlüğünü, hedeflerini ve kilonu bilen yapay zekâ spor koçu.'],
      ['Aboneliğimi nasıl iptal ederim, faturamı nereden alırım?', 'Abonelik Apple hesabın üzerinden yürür. iPhone\'unda Ayarlar > adın > Abonelikler bölümünden istediğin zaman iptal edebilirsin; dönem sonuna kadar Plus açık kalır. Satıcı Apple olduğu için fatura ve makbuzu Apple gönderir; iade taleplerini de Apple değerlendirir (reportaproblem.apple.com).'],
      ['Verilerim güvende mi?', 'Kayıtların şifreli bağlantıyla iletilir ve Avrupa Birliği\'ndeki sunucularda saklanır. Verilerin satılmaz, reklam amacıyla paylaşılmaz. Ayrıntılar gizlilik politikasında.'],
      ['Hesabımı nasıl silerim?', 'Uygulamada Ayarlar > Hesabı Sil yolunu izleyerek hesabını ve tüm verilerini kalıcı olarak silebilirsin. Bu işlem geri alınamaz. Aktif aboneliğin varsa ayrıca Apple hesabından iptal etmelisin.'],
      ['Uygulamanın dilini nasıl değiştiririm?', 'Ayarlar > Dil bölümünden Türkçe, İngilizce, Almanca, Fransızca, Japonca ya da Korece seçebilirsin.'],
      ['E-postaları nasıl kapatırım?', 'Haftalık bülteni Ayarlar\'dan ya da e-postanın altındaki "Aboneliği bırak" bağlantısından kapatabilirsin. Hesap doğrulama, şifre yenileme ve satın alma onayı e-postaları hesabınla ilgili olduğu için gönderilmeye devam eder.'],
    ],
    contactTitle: 'Hâlâ yardıma mı ihtiyacın var?', contactBody: 'Sorununu e-postayla yaz; kullandığın iPhone modelini ve uygulama sürümünü eklersen daha hızlı çözeriz.',
    send: 'E-posta gönder', support: 'destek', privacy: 'Gizlilik Politikası',
  },
  en: {
    title: 'MyCal Support', eyebrow: 'Support', h1: 'Help with MyCal',
    lede: 'Answers to common questions are below. If you cannot find what you need, write to us.',
    faqTitle: 'Frequently asked questions',
    faq: [
      ['What is MyCal?', 'MyCal is an app for tracking your daily calories and nutrition. You can log a meal by taking a photo, saying it out loud, scanning a barcode or searching by hand. Water, steps, weight, cycle tracking and working with a coach are part of the app too.'],
      ['How does photo analysis work?', 'Your photo is sent to an AI model, and the name, portion, calories and macros of the meal come back in a few seconds. You can correct the numbers before saving, and your corrections steer later estimates. One analysis a day is free; MyCal Plus makes it unlimited. Results are estimates, not medical advice.'],
      ['What does MyCal Plus include?', 'Unlimited photo analysis, menu and nutrition-label scanning, unlimited voice logging, and an AI sports coach that knows your diary, goals and weight.'],
      ['How do I cancel, and where is my invoice?', 'The subscription runs through your Apple account. You can cancel at any time on your iPhone under Settings > your name > Subscriptions; Plus stays on until the end of the period. Apple is the seller, so Apple sends the invoice or receipt and handles refund requests (reportaproblem.apple.com).'],
      ['Is my data safe?', 'Your entries are sent over an encrypted connection and stored on servers in the European Union. Your data is not sold or shared for advertising. Details are in the privacy policy.'],
      ['How do I delete my account?', 'In the app, go to Settings > Delete Account to permanently delete your account and all your data. This cannot be undone. If you have an active subscription, cancel it separately in your Apple account.'],
      ['How do I change the app language?', 'Under Settings > Language you can choose Turkish, English, German, French, Japanese or Korean.'],
      ['How do I stop the e-mails?', 'You can turn off the weekly newsletter in Settings or with the "Unsubscribe" link at the bottom of the e-mail. E-mails about your account (address confirmation, password reset, purchase confirmation) are still sent.'],
    ],
    contactTitle: 'Still need help?', contactBody: 'Write to us by e-mail; adding your iPhone model and app version helps us solve it faster.',
    send: 'Send an e-mail', support: 'support', privacy: 'Privacy Policy',
  },
  de: {
    title: 'MyCal Support', eyebrow: 'Support', h1: 'Hilfe zu MyCal',
    lede: 'Unten findest du Antworten auf häufige Fragen. Wenn etwas fehlt, schreib uns einfach.',
    faqTitle: 'Häufige Fragen',
    faq: [
      ['Was ist MyCal?', 'MyCal ist eine App, mit der du deine täglichen Kalorien und Nährwerte verfolgst. Mahlzeiten erfasst du per Foto, per Sprache, per Barcode oder über die Suche. Wasser, Schritte, Gewicht, Zyklus und die Zusammenarbeit mit einem Coach gehören ebenfalls dazu.'],
      ['Wie funktioniert die Foto-Analyse?', 'Dein Foto wird an ein KI-Modell geschickt; Name, Portion, Kalorien und Makros der Mahlzeit kommen in wenigen Sekunden zurück. Vor dem Speichern kannst du die Werte korrigieren, und deine Korrekturen verbessern spätere Schätzungen. Eine Analyse pro Tag ist kostenlos, mit MyCal Plus unbegrenzt. Die Ergebnisse sind Schätzungen und keine medizinische Beratung.'],
      ['Was enthält MyCal Plus?', 'Unbegrenzte Foto-Analysen, Speisekarten- und Etikettenscan, unbegrenzte Spracheinträge und einen KI-Sportcoach, der dein Tagebuch, deine Ziele und dein Gewicht kennt.'],
      ['Wie kündige ich, und wo ist meine Rechnung?', 'Das Abo läuft über deinen Apple-Account. Du kannst jederzeit auf dem iPhone unter Einstellungen > dein Name > Abonnements kündigen; Plus bleibt bis zum Ende des Zeitraums aktiv. Verkäufer ist Apple, daher schickt Apple die Rechnung oder Quittung und bearbeitet Erstattungen (reportaproblem.apple.com).'],
      ['Sind meine Daten sicher?', 'Deine Einträge werden verschlüsselt übertragen und auf Servern in der Europäischen Union gespeichert. Deine Daten werden nicht verkauft und nicht für Werbung weitergegeben. Einzelheiten stehen in der Datenschutzerklärung.'],
      ['Wie lösche ich mein Konto?', 'In der App unter Einstellungen > Konto löschen löschst du dein Konto und alle Daten dauerhaft. Das lässt sich nicht rückgängig machen. Ein laufendes Abo kündigst du zusätzlich in deinem Apple-Account.'],
      ['Wie ändere ich die Sprache der App?', 'Unter Einstellungen > Sprache wählst du Türkisch, Englisch, Deutsch, Französisch, Japanisch oder Koreanisch.'],
      ['Wie bestelle ich die E-Mails ab?', 'Den wöchentlichen Newsletter schaltest du in den Einstellungen oder über den Link „Abbestellen“ am Ende der E-Mail ab. E-Mails zu deinem Konto (Bestätigung der Adresse, Passwort zurücksetzen, Kaufbestätigung) werden weiterhin gesendet.'],
    ],
    contactTitle: 'Brauchst du noch Hilfe?', contactBody: 'Schreib uns per E-Mail; mit iPhone-Modell und App-Version können wir schneller helfen.',
    send: 'E-Mail senden', support: 'Support', privacy: 'Datenschutzerklärung',
  },
  fr: {
    title: 'Assistance MyCal', eyebrow: 'Assistance', h1: 'Aide pour MyCal',
    lede: 'Tu trouveras ci-dessous les réponses aux questions fréquentes. S’il te manque quelque chose, écris-nous.',
    faqTitle: 'Questions fréquentes',
    faq: [
      ['Qu’est-ce que MyCal ?', 'MyCal est une application pour suivre tes calories et tes apports au quotidien. Tu ajoutes un repas en le prenant en photo, en le disant à voix haute, en scannant un code-barres ou par la recherche. L’eau, les pas, le poids, le suivi du cycle et le travail avec un coach en font aussi partie.'],
      ['Comment fonctionne l’analyse photo ?', 'Ta photo est envoyée à un modèle d’IA ; le nom, la portion, les calories et les macros du repas reviennent en quelques secondes. Tu peux corriger les chiffres avant d’enregistrer, et tes corrections affinent les estimations suivantes. Une analyse par jour est gratuite ; avec MyCal Plus, elles sont illimitées. Les résultats sont des estimations, pas un avis médical.'],
      ['Que comprend MyCal Plus ?', 'Analyses photo illimitées, scan de menus et d’étiquettes nutritionnelles, saisie vocale illimitée et un coach sportif IA qui connaît ton journal, tes objectifs et ton poids.'],
      ['Comment résilier, et où est ma facture ?', 'L’abonnement passe par ton compte Apple. Tu peux résilier à tout moment sur ton iPhone dans Réglages > ton nom > Abonnements ; Plus reste actif jusqu’à la fin de la période. Le vendeur est Apple : c’est Apple qui envoie la facture ou le reçu et qui traite les demandes de remboursement (reportaproblem.apple.com).'],
      ['Mes données sont-elles en sécurité ?', 'Tes saisies sont transmises par une connexion chiffrée et stockées sur des serveurs situés dans l’Union européenne. Tes données ne sont ni vendues ni partagées à des fins publicitaires. Les détails figurent dans la politique de confidentialité.'],
      ['Comment supprimer mon compte ?', 'Dans l’application, va dans Réglages > Supprimer le compte pour supprimer définitivement ton compte et toutes tes données. Cette action est irréversible. Si tu as un abonnement en cours, résilie-le séparément dans ton compte Apple.'],
      ['Comment changer la langue de l’application ?', 'Dans Réglages > Langue, tu peux choisir le turc, l’anglais, l’allemand, le français, le japonais ou le coréen.'],
      ['Comment arrêter les e-mails ?', 'Tu peux désactiver la newsletter hebdomadaire dans les Réglages ou avec le lien « Se désabonner » en bas de l’e-mail. Les e-mails liés à ton compte (confirmation d’adresse, réinitialisation du mot de passe, confirmation d’achat) continuent d’être envoyés.'],
    ],
    contactTitle: 'Encore besoin d’aide ?', contactBody: 'Écris-nous par e-mail ; indique ton modèle d’iPhone et la version de l’application pour une réponse plus rapide.',
    send: 'Envoyer un e-mail', support: 'assistance', privacy: 'Politique de confidentialité',
  },
  ja: {
    title: 'MyCal サポート', eyebrow: 'サポート', h1: 'MyCalのヘルプ',
    lede: 'よくある質問への回答を以下にまとめました。解決しない場合は、直接ご連絡ください。',
    faqTitle: 'よくある質問',
    faq: [
      ['MyCalとは？', 'MyCalは、毎日のカロリーと栄養を記録するためのアプリです。食事は写真、音声、バーコード、検索のいずれでも追加できます。水分、歩数、体重、生理周期の記録や、コーチとの取り組みもアプリ内で行えます。'],
      ['写真分析はどのように動きますか？', '撮影した写真はAIモデルに送られ、数秒で料理名、量、カロリー、PFCが返ってきます。保存前に数値を修正でき、その修正は次回以降の推定に反映されます。分析は1日1回無料、MyCal Plusでは無制限です。結果は推定値であり、医学的な助言ではありません。'],
      ['MyCal Plusには何が含まれますか？', '無制限の写真分析、メニューと栄養成分表示の読み取り、無制限の音声記録、そして日記・目標・体重を把握したAIスポーツコーチです。'],
      ['解約の方法と領収書は？', 'サブスクリプションはApple Accountを通じて管理されます。iPhoneの「設定」>「ユーザ名」>「サブスクリプション」からいつでも解約でき、期間終了まではPlusをご利用いただけます。販売者はAppleのため、領収書はAppleから届き、返金のご依頼もAppleが対応します（reportaproblem.apple.com）。'],
      ['データは安全ですか？', '記録は暗号化された通信で送信され、EU内のサーバーに保存されます。データを販売したり、広告目的で共有したりすることはありません。詳しくはプライバシーポリシーをご覧ください。'],
      ['アカウントを削除するには？', 'アプリの「設定」>「アカウントを削除」から、アカウントとすべてのデータを完全に削除できます。この操作は取り消せません。有効なサブスクリプションがある場合は、別途Apple Accountで解約してください。'],
      ['アプリの言語を変更するには？', '「設定」>「言語」から、トルコ語、英語、ドイツ語、フランス語、日本語、韓国語を選べます。'],
      ['メールを停止するには？', '週刊ニュースレターは「設定」またはメール下部の「配信停止」リンクから停止できます。アカウントに関するメール（アドレスの確認、パスワードの再設定、購入の確認）は引き続き送信されます。'],
    ],
    contactTitle: 'まだ解決しませんか？', contactBody: 'メールでお知らせください。iPhoneの機種とアプリのバージョンを添えていただくと、より早く対応できます。',
    send: 'メールを送る', support: 'サポート', privacy: 'プライバシーポリシー',
  },
  ko: {
    title: 'MyCal 지원', eyebrow: '지원', h1: 'MyCal 도움말',
    lede: '자주 묻는 질문의 답을 아래에 정리했어요. 찾는 내용이 없으면 바로 메일을 보내 주세요.',
    faqTitle: '자주 묻는 질문',
    faq: [
      ['MyCal은 무엇인가요?', 'MyCal은 매일의 칼로리와 영양을 기록하는 앱이에요. 식사는 사진, 음성, 바코드, 검색으로 추가할 수 있어요. 물, 걸음 수, 체중, 생리 주기 기록과 코치와 함께하는 관리도 앱 안에 있어요.'],
      ['사진 분석은 어떻게 작동하나요?', '찍은 사진이 AI 모델로 전송되고, 몇 초 안에 음식 이름, 양, 칼로리, 탄단지가 돌아와요. 저장하기 전에 수치를 고칠 수 있고, 그 수정은 다음 추정에 반영돼요. 분석은 하루 1회 무료이고 MyCal Plus에서는 무제한이에요. 결과는 추정치이며 의학적 조언이 아니에요.'],
      ['MyCal Plus에는 무엇이 포함되나요?', '무제한 사진 분석, 메뉴와 영양 성분표 스캔, 무제한 음성 기록, 그리고 내 다이어리·목표·체중을 아는 AI 스포츠 코치예요.'],
      ['해지는 어떻게 하고 영수증은 어디서 받나요?', '구독은 Apple 계정을 통해 관리돼요. iPhone의 설정 > 내 이름 > 구독에서 언제든지 해지할 수 있고, 기간이 끝날 때까지 Plus를 쓸 수 있어요. 판매자는 Apple이므로 영수증은 Apple이 보내고 환불 요청도 Apple이 처리해요(reportaproblem.apple.com).'],
      ['내 데이터는 안전한가요?', '기록은 암호화된 연결로 전송되어 유럽연합 내 서버에 저장돼요. 데이터를 판매하거나 광고 목적으로 공유하지 않아요. 자세한 내용은 개인정보 처리방침에 있어요.'],
      ['계정은 어떻게 삭제하나요?', '앱의 설정 > 계정 삭제에서 계정과 모든 데이터를 영구적으로 삭제할 수 있어요. 이 작업은 되돌릴 수 없어요. 구독 중이라면 Apple 계정에서 따로 해지해 주세요.'],
      ['앱 언어는 어떻게 바꾸나요?', '설정 > 언어에서 튀르키예어, 영어, 독일어, 프랑스어, 일본어, 한국어 중에서 고를 수 있어요.'],
      ['이메일은 어떻게 끄나요?', '주간 뉴스레터는 설정이나 이메일 아래의 "수신 거부" 링크에서 끌 수 있어요. 계정과 관련된 이메일(주소 확인, 비밀번호 재설정, 구매 확인)은 계속 발송돼요.'],
    ],
    contactTitle: '아직 도움이 필요하신가요?', contactBody: '이메일로 알려 주세요. iPhone 기종과 앱 버전을 함께 적어 주시면 더 빨리 도와드릴 수 있어요.',
    send: '이메일 보내기', support: '지원', privacy: '개인정보 처리방침',
  },
};

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const CHEV = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>';
const source = readFileSync('support.html', 'utf8');
const head = source.slice(source.indexOf('<head>'), source.indexOf('</head>') + '</head>'.length);

for (const [lang, t] of Object.entries(T)) {
  const langs = Object.keys(T).map((l) => (l === lang ? `<strong>${NAME[l]}</strong>` : `<a href="${FILE[l]}" hreflang="${l}" style="color:inherit">${NAME[l]}</a>`)).join(' · ');
  const page = `<!doctype html>
<html lang="${lang}">
${head.replace(/<title>[^<]*<\/title>/, `<title>${esc(t.title)}</title>`)}
<body>

<div class="wrap">
  <span class="eyebrow"><span class="mark"></span>${esc(t.eyebrow)}</span>
  <h1>${esc(t.h1)}</h1>
  <p class="lede">${esc(t.lede)}</p>

  <section>
    <h2>${esc(t.faqTitle)}</h2>
    <div class="faq">
${t.faq.map(([q, a], i) => `      <details${i === 0 ? ' open' : ''}>\n        <summary>${esc(q)}${CHEV}</summary>\n        <p>${esc(a)}</p>\n      </details>`).join('\n')}
    </div>
  </section>

  <section class="contact">
    <div class="contact-text">
      <h2>${esc(t.contactTitle)}</h2>
      <p>${esc(t.contactBody)}</p>
    </div>
    <a class="btn" href="mailto:${EMAIL}">
      ${esc(t.send)}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
    </a>
  </section>

  <footer>
    <span>MyCal · <a href="${PRIVACY}" style="color:inherit">${esc(t.privacy)}</a></span>
    <span>${esc(t.support)}: ${EMAIL}</span>
  </footer>
  <footer style="border-top:0;padding-top:8px"><span>${langs}</span></footer>
</div>

</body>
</html>
`;
  writeFileSync(FILE[lang], page);
}
console.log('built', Object.values(FILE).join(', '));
