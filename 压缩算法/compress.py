import os
from osgeo import gdal
import tkinter as tk
from tkinter import filedialog
from tkinter.messagebox import *

def get_file_size(file_path):
    fsize = os.path.getsize(file_path)
    fsize = fsize / float(1024 * 1024)
    return round(fsize, 2)


def progress(percent, msg, tag):
    print(percent, msg, tag)


def compress(path, target_path):
    dataset = gdal.Open(path)
    driver = gdal.GetDriverByName('GTiff')
    driver.CreateCopy(target_path, dataset, strict=1, callback=progress, options=["TILED=YES", "COMPRESS=LZW"])
    # strict=1表示和原来的影像严格一致，0表示可以有所调整
    # callback为进度回调函数
    # LZW针对像素点，黑白图像效果好
    del dataset

# source_path = 'E:\\pythonProject\\test1.tif'
# target_path = 'E:\\pythonProject\\test1_com.tif'

# print("处理前", str(get_file_size(source_path)) + "MB")
# compress(source_path, target_path)
# print("处理后", str(get_file_size(target_path)) + "MB")

def uploadFile():
    f_path = filedialog.askopenfilename()
    print('\n获取的文件地址：', f_path)
    target_path = f_path[0:-4] + '_com' + f_path[-4:-1] + f_path[-1]
    result = askyesno('提示', '确认要压缩图像吗?')
    if result:
        info1 = "处理前" + str(get_file_size(f_path)) + "MB"
        compress(f_path, target_path)
        info2 = "处理后" + str(get_file_size(target_path)) + "MB"
        info = info1 + '\n' + info2 + '\n文件路径为' + target_path
        showinfo('提示', info)



window = tk.Tk()
window.title('遥感数据压缩工具')
window.geometry('450x170')

# 按钮
l = tk.Label(window,text='这是一个高效的遥感图像压缩工具，可以做到无损压缩', font=('Microsoft YaHei', 12), width=120, height=2)
l1 = tk.Label(window,text='请上传您的文件，压缩完成后会生成在文件的同级目录下', font=('Microsoft YaHei', 12), width=120, height=2)
l.pack()
l1.pack()

b = tk.Button(window,
    text='上传文件',      # 显示在按钮上的文字
    width=15, height=2,
    command=uploadFile)     # 点击按钮式执行的命令
b.pack()    # 按钮位置

window.mainloop()


