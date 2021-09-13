import os
from opencc import OpenCC
from tqdm import tqdm

cc = OpenCC('s2t')

paths = []

for root, subdirs, files in os.walk("./"):
    for filename in files:
        if filename.endswith('.html') or filename.endswith('.js') or filename.endswith('.json'):
            paths.append(os.path.join(root, filename))

for path in tqdm(paths):
    if 'roll20-module' in path:
        continue

    with open(path, 'r', encoding='utf8') as f:
        lines = f.readlines()

    new_lines = []
    for line in lines:
        new_lines.append(cc.convert(line))

    with open(path, 'w', encoding='utf8') as of:
        of.writelines(new_lines)