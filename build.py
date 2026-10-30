import json
import os

# ⚠️ 把下面的 "你的用户名" 和 "你的仓库名" 改成你自己的实际名字
# 如果你绑定了自定义域名，也可以直接写 "https://你的域名.com"
DOMAIN = "https://你的用户名.github.io/你的仓库名"

# 读取模板
with open("config.template.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# 自动把 spider 的相对路径替换成绝对域名
if "spider" in data and data["spider"].startswith("."):
    data["spider"] = DOMAIN + data["spider"].lstrip(".")

# 生成 TVBox 最终读取的 config.json
with open("config.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

print("Config generated successfully!")