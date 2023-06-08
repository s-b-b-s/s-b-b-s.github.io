---
emoji: "☁️"
title: "[AWS] AWS CLI 사용하기 - SSM으로 EC2서버 접속(3)"
date: '2023-06-03 23:01:00'
author: sb
tags: aws rolesanywhere awscli ssm ec2 credential 
categories: AWS
---

## 👋 소개

awscli를 Roles Anywhere를 통해서 접속 해보자🙌
- 1 RootCA 인증서 만들기 (CA Bundle 인증서) - **1편**
- 2 SSL 인증서 만들기 (RootCA로 서명한 aws접속용 인증서) - **1편**
- 3 CA Bundle 등록(trust-anchor) - **2편**
- 4 role 생성 - **2편**
- 5 profile 생성 - **2편**
- 6 aws_credential_helper로 credentials 생성 - **2편**
- 7 aws cli 설치 및 명령어 사용 해보기 - **2편**
- 8 EC2에 SSM Agent 설치 - **3편**
- 9 PC에 SSM plugin 설치후 aws cli로 EC2접속 - **3편**

***
### ⌨️ 8. EC2에 SSM Agent 설치
https://docs.aws.amazon.com/ko_kr/systems-manager/latest/userguide/agent-install-al.html <br>
> EC2를 접속하여 아키텍처에 따른 Agent 설치 <br>
```bash
# 설치
sudo yum install -y https://s3.amazonaws.com/ec2-downloads-windows/SSMAgent/latest/linux_amd64/amazon-ssm-agent.rpm

# 설치 확인
sudo systemctl status amazon-ssm-agent
```

***

### ⌨️ 9. PC에 SSM plugin 설치후 aws cli로 EC2접속 
 https://docs.aws.amazon.com/ko_kr/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html  <br>
> 본인 OS에 맞는 플로그인 다운로드 및 설치 <br>
```bash
# 다운로드
curl "https://s3.amazonaws.com/session-manager-downloads/plugin/latest/mac/sessionmanager-bundle.zip" -o "sessionmanager-bundle.zip"

# 압축해제 
unzip sessionmanager-bundle.zip

# 설치 명령
sudo ./sessionmanager-bundle/install -i /usr/local/sessionmanagerplugin -b /usr/local/bin/session-manager-plugin
```

> AWS CLI로 SSM 으로 EC2 접속 해보기<br>
```bash
# InstanceId 로 grep 을 함
> aws ec2 describe-instances | grep InstanceId
# 이런값이 나옴 "InstanceId": "i-0504b7490773b25be"

# 위에 나온 ID로 접속하면 EC2 접근됨
> aws ssm start-session --target i-0504b7490773b25be
```

### 참고사이트
> https://docs.aws.amazon.com/ko_kr/systems-manager/latest/userguide/agent-install-al.html<br>
> https://docs.aws.amazon.com/ko_kr/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html


```toc

```