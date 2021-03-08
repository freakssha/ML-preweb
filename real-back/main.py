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

    # add imports
    with open(edited_file, 'r') as file:
        list_of_lines = file.readlines()

        def_to_add = f'def {user_func_name}({user_arg_name}):\n' \
                     '\twith open(os.path.join("input", "test.csv"), "a") as fp:\n' \
                     '\t\twr = csv.writer(fp, dialect="excel")\n' \
                     '\t\twr.writerow(user_data)\n'

        for imprt in imports:
            imports_id += 1
            list_of_lines[imports_id] = '\n' + imprt

        list_of_lines[imports_id + 1] = '\n' + def_to_add

        with open(edited_file, "w") as new_file:
            new_file.writelines(list_of_lines)


edit_user_file([
    {'isMeaning': 1, 'types': 'integer', 'values': 'ValueExample or plug'},
    {'isMeaning': 1, 'types': 'integer', 'values': 'ValueExample or plug'},
],
    'is_user_alive',
    'user_file')
