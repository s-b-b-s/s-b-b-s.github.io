---
emoji: "📘"
title: "[블로그] 구글 광고 연동 with Gastby - Google Adsense(1)"
date: '2023-05-28 23:01:00'
author: sb
tags: 블로그 gitlab google ga 구글광고 adsense 구글애드센스 애드센스
categories: 블로그
---

## 👋 소개

Gastby로 만든 Gitlab 블로그에 구글 애드센스를 붙여보자🙌
***
### ⌨️ 1. Google AdSense 가입하기
> https://www.google.com/adsense<br>
> 사이트 `<head>` `</head>` 사이에 애드센스 스크립트를 넣어야 검토가 완료됩니다 <br>
> 사이트 검토는 최대 2주정도 소요 됨 
![사진1](./2.png)
***

### ⌨️ 2. Gastby에 AdSense plugin 설치 (<head>에 자동태그삽입)
> 플러그인을 설치하면 `<head>` 사이에 자동으로 구글애드센스 코드를 삽입해줌
> 플러그인 설치 
```bash
npm install --save gatsby-plugin-google-adsense
```
> gatsby-config.js 에 설정 추가<br>
> 본인 퍼블리쉬ID는 구글애드 계정 -> 설정 -> 계정정보 에서 pub-숫자로 확인할수있음
```js
    {
      resolve: `gatsby-plugin-google-adsense`,
      options: {
        publisherId: `ca-pub-본인 publishedID`
      },
    },
```

***
### ⌨️ 3. Gastby에 ads.txt 파일 만들기 
> Gastby 프로젝트 디렉터리에 `/static` 디렉토리는 빌드후 `/public` 디렉토리에 파일을 생성해 줌<br>
> 본인 퍼블리쉬ID는 구글애드 계정 -> 설정 -> 계정정보 에서 pub-숫자로 확인할수있음
```
google.com, pub-본인 publishedID, DIRECT, f08c47fec0942fa0
```

***
### 참고사이트
> https://developers.google.com/adsense/platforms/transparent/ads-txt?hl=ko


```toc

```