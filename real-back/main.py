user_file = 'ml.py'


with open(user_file, 'r') as file:
    for line in file:
        if 'import' in line.split():

            print(line)
            print(userData)

