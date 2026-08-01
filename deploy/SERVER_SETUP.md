# jbig.co.kr/recruit 최초 연결

모집 페이지는 `dist/deploy/`에 만들어지는 정적 파일입니다. Node 프로세스나
systemd 서비스는 필요하지 않습니다. GitHub Actions는 새 릴리스를 별도
디렉터리에 풀고 `current` 심볼릭 링크만 교체합니다.

## 1. GitHub Actions secrets

`dev-JBIG/jbig_promopage` 저장소의 **Settings → Secrets and variables →
Actions**에 아래 값을 등록합니다.

- `DEPLOY_HOST`: 기존 홈페이지 서버 주소
- `DEPLOY_USER`: 기존 배포 SSH 사용자
- `SSH_PRIVATE_KEY`: 기존 배포용 SSH 개인키
- `DEPLOY_PATH`: `volume/jbig_promopage`

`DEPLOY_PATH`에는 `/home/ubuntu` 같은 절대 경로나 기존 frontend/backend
경로를 넣지 않습니다. workflow가 자동으로 `$HOME/volume/jbig_promopage`를
사용합니다.

## 2. 첫 정적 릴리스 배포

위 secrets가 등록된 뒤 `main`에 배포 workflow가 포함된 커밋을 push합니다.
GitHub Actions의 `Promotional Site CI/CD`가 성공하면 서버에 다음 구조가
생깁니다.

```text
~/volume/jbig_promopage/
├── current -> releases/<timestamp>
└── releases/
    └── <timestamp>/
        ├── index.html
        ├── recruit.rsc
        ├── favicon.svg
        ├── fox-mascots.webp
        └── assets/
```

## 3. 서버 파일 확인

로컬 터미널에서 기존 방식으로 서버에 접속한 뒤 확인합니다.

```bash
ssh DEPLOY_USER@DEPLOY_HOST
readlink -f ~/volume/jbig_promopage/current
find ~/volume/jbig_promopage/current -maxdepth 2 -type f | sort | head -30
```

`index.html`, `recruit.rsc`, `favicon.svg`, `fox-mascots.webp`, `assets/`가
보여야 다음 단계로 진행할 수 있습니다.

## 4. nginx 연결

기존 설정을 먼저 읽고 백업합니다.

```bash
sudo sed -n '1,280p' /etc/nginx/sites-available/jbig.co.kr
sudo cp /etc/nginx/sites-available/jbig.co.kr /etc/nginx/sites-available/jbig.co.kr.backup
```

`deploy/nginx-location.conf.example`의 location 블록을 기존 `jbig.co.kr`
HTTPS `server { ... }` 안에 추가합니다. `DEPLOY_USER`가 `ubuntu`가 아니라면
예시의 `/home/ubuntu`를 실제 홈 디렉터리로 바꿉니다.

설정 검사에 성공한 경우에만 reload합니다.

```bash
sudo nginx -t
sudo systemctl reload nginx
```

`nginx -t`가 실패하면 reload하지 말고 오류 메시지와 현재 설정을 확인합니다.

## 5. 온라인 검증

```bash
curl -sS https://jbig.co.kr/recruit | grep -F "JBIG 모집"
curl -I https://jbig.co.kr/recruit/favicon.svg
curl -I https://jbig.co.kr/
```

브라우저에서는 `/recruit`를 새로고침하고 개발자 도구 Network에서
`/recruit/assets/` 요청이 모두 200인지 확인합니다. 기존 `/`, 게시판,
로그인, `/api/`도 함께 확인합니다.

## 롤백

정적 릴리스만 되돌릴 때는 `releases`에서 이전 디렉터리를 확인한 뒤
`current`를 이전 릴리스로 바꿉니다. nginx 설정을 되돌려야 할 때는 백업
파일을 복원하고 반드시 `sudo nginx -t` 통과 후 reload합니다.
