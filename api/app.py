from flask import Flask, request, send_file

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'py'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def edit_user_file(user_parameters, user_func_name, user_arg_name):
    # kostyl
    global user_file_before
    line_id = 0
    imports_id = 0
    imports = []

    edited_file = "edited_ml.py"

    reformatted_user_parameters = ''
    user_parameters_counter = 0

    for user_parameter in user_parameters:
        if user_parameter['types'] == 'string':
            reformatted_user_parameters = reformatted_user_parameters + f'\t{user_arg_name}[{user_parameters_counter}] = "' + "'" + f'" + {user_arg_name}[{user_parameters_counter}] + "' + "'" + '"\n'
        if user_parameter['isMeaning'] == 0:
            reformatted_user_parameters = reformatted_user_parameters + f'\t{user_arg_name}.insert({user_parameters_counter}, {user_parameter["values"]})\n'

        user_parameters_counter += 1

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

    with open(edited_file, 'r') as file:
        list_of_lines = file.readlines()

        # add imports
        for imprt in imports:
            imports_id += 1
            list_of_lines[imports_id] = '\n' + imprt

        # add func
        list_of_lines[imports_id + 1] = f'\ndef {user_func_name}({user_arg_name}):\n' \
                                        f'{reformatted_user_parameters}\n' \
                                        '\twith open(os.path.join("input", "test.csv"), "a") as fp:\n' \
                                        '\t\twr = csv.writer(fp, dialect="excel")\n' \
                                        '\t\twr.writerow(user_data)\n'

        list_of_lines[line_id - 1] = '\n\treturn predictions[len(predictions)-1:]'

        # finnish write
        with open(edited_file, "w") as new_file:
            new_file.writelines(list_of_lines)

    return send_file('../edited_ml.py', 'text/python')


@app.route('/api/uploads', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        user_file = request.files['file']
        user_file.save(user_file.filename)

        # kostyl
        global user_file_before

        user_file_before = user_file

        return 'File Uploaded'


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
