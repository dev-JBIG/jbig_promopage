# jbig_promopage

JBIG 모집·홍보 홈페이지입니다. 기존 커뮤니티 프론트엔드와 독립적으로 개발하고 배포합니다.

## 로컬 실행

Node.js `>=22.13.0`이 필요합니다.

```bash
npm install
npm run dev
```

## 검증

```bash
npm test
npm run lint
```

`npm test`는 배포 빌드와 렌더링 스모크 테스트를 함께 수행합니다.

## 운영 배포

`npm run build`는 `jbig.co.kr/recruit`용 정적 파일을 `dist/deploy/`에
준비합니다. `main` push 시 `.github/workflows/deploy.yml`이 별도 릴리스를
업로드하고 서버의 `current` 링크를 교체합니다.

최초 GitHub Secrets 등록과 nginx 연결 절차는
[`deploy/SERVER_SETUP.md`](deploy/SERVER_SETUP.md)를 따릅니다. 정적 배포이므로
별도 Node/systemd 운영 프로세스는 필요하지 않습니다.
