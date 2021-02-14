import os
from werkzeug.utils import secure_filename

from flask import Flask, jsonify, request, flash, redirect, url_for

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'py'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

user_files = [
    {
        'user_file': 0,
        'user_parameters': [0, 0],
        'user_func_name': 0,
        'user_arg_name': 0,
    }
]


def edit_user_file(user_parameters, user_func_name, user_arg_name):

    # kostyl
    global user_file_before
    line_id = 0
    imports_id = 0
    imports = []

    edited_file = "edited_ml.py"

    # create new file with target lines only
    with open(user_file_before.filename, 'r') as file:
        for line in file:
            if line != '\n' and '#' not in line.split():
                with open(edited_file, "a") as new_file:
                    new_file.write(line)

    # take imports
    with open(edited_file, 'r') as file:
        for line in file:
            if 'import' in line.split():
                imports.append(line)
                print(imports)

    # tab without imports
    with open(edited_file, 'r') as file:
        for line in file:
            if 'import' not in line.split():
                with open(edited_file, "r") as new_file:
                    list_of_lines = new_file.readlines()
                    list_of_lines[line_id] = '\t' + line
                    with open(edited_file, "w") as new_file:
                        new_file.writelines(list_of_lines)

                line_id += 1

    # add imports, func and main return
    with open(edited_file, 'r') as file:
        list_of_lines = file.readlines()

        def_to_add = f'def {user_func_name}({user_arg_name}):\n' \
                     '\twith open(os.path.join("input", "test.csv"), "a") as fp:\n' \
                     '\t\twr = csv.writer(fp, dialect="excel")\n' \
                     '\t\twr.writerow(user_data)\n'
        return_to_add = '\treturn predictions[len(predictions)-1:]'

        for imprt in imports:
            imports_id += 1
            list_of_lines[imports_id] = '\n' + imprt

        list_of_lines[imports_id + 1] = '\n' + def_to_add
        print(line_id)
        list_of_lines[line_id - 1] = '\n' + return_to_add

        with open(edited_file, "w") as new_file:
            new_file.writelines(list_of_lines)








                #if counter == 1:
                    #







            # ["Survived"]

                # /t all after import, add func, return in the end, test edit if error delete


@app.route('/api/uploads', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        user_file = request.files['file']
        user_file.save(user_file.filename)

        # kostyl
        global user_file_before

        user_file_before = user_file

        edit_user_file(0, 'is_user_alive', 'user_data')

        return user_file.filename


@app.route('/api/parameters', methods=['GET', 'POST'])
def set_parameters():
    if request.method == 'POST':
        user_file_data = request.get_json()

        user_parameters = user_file_data['user_parameters']
        user_func_name = user_file_data['user_func_name']
        user_arg_name = user_file_data['user_arg_name']

        print(user_parameters, user_func_name, user_arg_name)

        return edit_user_file(user_parameters, user_func_name, user_arg_name)


if __name__ == '__main__':
    app.run()
