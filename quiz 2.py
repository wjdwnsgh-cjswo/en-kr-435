import csv
from tkinter import*
from tkinter import messagebox
import random
with open('quiz_data_435.csv','r') as file:  #인코딩 오류나는 경우 encoding="UTF-8-sig" 옵션 추가
    # data = csv.reader(file)
    # for row in data:
    #     print(row)
    # data = list(csv.reader(file))
    # print(data)
    questions=list(csv.reader(file))


# multi_coice=random.sample(questions,4)
# print(multi_coice)    
# answer=random.randint(0,3)
# cur_question=multi_coice[answer][0] #정답 만들기, 앞에단어만(0번째 인덱스)
# print(cur_question)

answer=0

#문제생성-함수만들기
def next_question():
    global answer
    for i in range(4):
        buttons[i].config(bg="#3A6073")
    multi_coice=random.sample(questions,4)
    answer=random.randint(0,3)
    cur_question=multi_coice[answer][0] #정답 만들기, 앞에단어만(0번째 인덱스)
    questions_label.config(text=cur_question)
    
    #4지선답 레이블에 삽입
    for i in range(4):
        buttons[i].config(text=multi_coice[i][1]) #뜻
        
#정답 체크
temp=0
combo=0
point=0
def check_answer(idx):
    global temp
    global combo
    global point
    idx=int(idx)
    if answer==idx:
        #버튼 색 변경
        buttons[idx].config(bg="skyblue")
        window.after(300, next_question) #정답을 맞추면 1초후에 자동으로 다음문제가 실행
        temp=0
        combo+=1
        point+=1
        messagebox.showinfo("정답입니다.",f"콤보 횟수 : {combo}회 / 맞은 횟수(누적) : {point}회")
    else:
        temp+=1
        buttons[idx].config(bg="red")
        messagebox.showinfo("틀렸습니다.",f"틀린 횟수 : {temp}회")
        combo=0
        

#main      
window=Tk()
window.title('영어 퀴즈')
window.config(padx=30, pady=10, bg="#3A6073")

questions_label=Label(window, width=20, height=2, text="test",
                      font=("나눔바른펜",25,"bold"), bg="#3A6073", fg="skyblue")
questions_label.pack(pady=30)

buttons=[] #공배열
for i in range(4):
    btn=Button(window, text=f"{i}번", width=35, height=2, font=("나눔바른펜", 15, "bold"),
               bg="#99f2c8", command=lambda idx=i: check_answer(idx))
    btn.pack()
    buttons.append(btn)
    
next_btn=Button(window, text="다음 문제", width=35, height=2,command=next_question,
             font=("나눔바른펜", 15, "bold"),bg="#f7797d")
next_btn.pack(pady=30)

#함수호출
next_question()

window.mainloop()
    
 
        
        
        

    
    