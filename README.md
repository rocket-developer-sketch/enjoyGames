# enjoyGames

자바스크립트로 구성된 아케이드 게임형식으로 웹으로 개발 되었습니다.  
계속적으로 게임 추가할 예정입니다.  
게임 추가와 더불어 게임 성적을 등록하고, 순위를 볼 수 있는 JPA기반의 시스템을 도입할 예정입니다.  

-------------------------------------

1. 폴더 구조  
  |-- enjoyGames/main/  
    |  
    |-- java/com/game/demo: JAVA SOURCE (2021.05.13 현재 Controller 만 존재)  
    |-- resources  
    |--   |-- static: images, Javascript Source 파일(로직)  
    |-- templates: HTML 파일  
    |-- application.properties: 설정 파일. Resource 위치 및 DB 연결 비활성화 설정  
    |

2. 설치 방법
    - Spring Boot 설치
      - JPA, PostgreSQL, thyeleaf template 옵션 체크 필요

