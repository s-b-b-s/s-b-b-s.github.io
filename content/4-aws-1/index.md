---
emoji: "☁️"
title: "[AWS] AWS CLI 사용하기 - 인증서 만들기(1)"
date: '2023-06-01 23:01:00'
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
### ⌨️ 1. RootCA 인증서 만들기 (CA Bundle 인증서) 
> key 생성  `.key 파일 생성됨` 
```bash
openssl genrsa -aes256 -out lesstif-rootca.key 2048
```
> csr 인증서 요청파일 config파일 만들기 `.conf 파일 생성됨` 
```bash
cat <<EOF > rootca_openssl.conf
[ req ]
default_bits            = 2048
default_md              = sha1
default_keyfile         = lesstif-rootca.key
distinguished_name      = req_distinguished_name
extensions             = v3_ca
req_extensions = v3_ca
 
[ v3_ca ]
basicConstraints       = critical, CA:TRUE, pathlen:0
subjectKeyIdentifier   = hash
##authorityKeyIdentifier = keyid:always, issuer:always
keyUsage               = keyCertSign, cRLSign
nsCertType             = sslCA, emailCA, objCA
[req_distinguished_name ]
countryName                     = Country Name (2 letter code)
countryName_default             = KR
countryName_min                 = 2
countryName_max                 = 2

# 회사명 입력
organizationName              = Organization Name (eg, company)
organizationName_default      = lesstif Inc.
 
# 부서 입력
#organizationalUnitName          = Organizational Unit Name (eg, section)
#organizationalUnitName_default  = Condor Project
 
# SSL 서비스할 domain 명 입력
commonName                      = Common Name (eg, your name or your server's hostname)
commonName_default             = lesstif's Self Signed CA
commonName_max                  = 64 
```
> conf파일과 key파일로 csr 요청파일 생성하기 `.csr 파일 생성됨` 
```bash
openssl req -new -key lesstif-rootca.key -out lesstif-rootca.csr -config rootca_openssl.conf
```
> key파일과 csr파일로 crt 인증서 생성하기 `.crt 파일 생성됨` 
```bash
openssl x509 -req -days 3650 \
-extensions v3_ca \
-set_serial 1 \
-in lesstif-rootca.csr \
-signkey lesstif-rootca.key \
-out lesstif-rootca.crt \
-extfile rootca_openssl.conf
```
> crt인증서 -> pem 인증서로 만들기  `.pem 파일 생성됨` 
```bash
openssl x509 -inform PEM -in lesstif-rootca.crt > lesstif-rootca.pem
```
> 
***

### ⌨️ 2. SSL 인증서 만들기 (RootCA로 서명한 aws접속용 인증서)
> key 생성  `.key 파일 생성됨` 
```bash
openssl genrsa -aes256 -out lesstif.com.key 2048
```
> passphrase 제거  `.key 파일 재생성됨` 
```bash
cp  lesstif.com.key  lesstif.com.key.enc
openssl rsa -in  lesstif.com.key.enc -out lesstif.com.key
```
> csr 인증서 요청파일 config파일 만들기 `.conf 파일 생성됨` 
```bash
cat <<EOF > rootca_openssl.conf
[ req ]
default_bits            = 2048
default_md              = sha1
default_keyfile         = lesstif-rootca.key
distinguished_name      = req_distinguished_name
extensions             = v3_user
## 인증서 요청시에도 extension 이 들어가면 authorityKeyIdentifier 를 찾지 못해 에러가 나므로 막아둔다.
## req_extensions = v3_user

[ v3_user ]
# Extensions to add to a certificate request
basicConstraints = CA:FALSE
authorityKeyIdentifier = keyid,issuer
subjectKeyIdentifier = hash
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
## SSL 용 확장키 필드
extendedKeyUsage = serverAuth,clientAuth
subjectAltName          = @alt_names
[ alt_names]
## Subject AltName의 DNSName field에 SSL Host 의 도메인 이름을 적어준다.
## 멀티 도메인일 경우 *.lesstif.com 처럼 쓸 수 있다.
DNS.1   = www.lesstif.com
DNS.2   = lesstif.com
DNS.3   = *.lesstif.com

[req_distinguished_name ]
countryName                     = Country Name (2 letter code)
countryName_default             = KR
countryName_min                 = 2
countryName_max                 = 2

# 회사명 입력
organizationName              = Organization Name (eg, company)
organizationName_default      = lesstif Inc.
 
# 부서 입력
organizationalUnitName          = Organizational Unit Name (eg, section)
organizationalUnitName_default  = lesstif SSL Project
 
# SSL 서비스할 domain 명 입력
commonName                      = Common Name (eg, your name or your server's hostname)
commonName_default             = lesstif.com
commonName_max                  = 64
```
> conf파일과 key파일로 csr 요청파일 생성하기 `.csr 파일 생성됨` 
```bash
openssl req -new -key lesstif.com.key -out lesstif.com.csr -config host_openssl.conf
```
> key파일과 csr파일로 crt 인증서 생성하기 `.crt 파일 생성됨` 
```bash
openssl x509 -req -days 1825 -extensions v3_user -in lesstif.com.csr \
-CA lesstif-rootca.crt -CAcreateserial \
-CAkey  lesstif-rootca.key \
-out lesstif.com.crt  -extfile host_openssl.conf
```

***
### 참고사이트
> https://www.lesstif.com/system-admin/openssl-root-ca-ssl-6979614.html


```toc

```