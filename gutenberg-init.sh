# Cloning Front/Gutenberg
# and installing its dependencies 

cd src/components

if test -d $(pwd)/gutenberg/blocks; then
    echo "* $(pwd)/gutenberg already exists"
else
    # clone repo
    echo "* Cloning Gutenberg"
    rm -rf gutenberg
    git clone git@github.com:front/gutenberg.git
fi

cd gutenberg

echo "* Removing node_modules if they exist"
rm -rf node_modules

echo "* Runing npm install"
npm install

echo "* Runing npm run build"
npm run build

# echo "* Removing build if exist"
rm -rf build

echo "* Coping folders to build/"
mkdir build

folders=("blocks" "components" "data" "date" "edit-post" "editor" "element" "i18n" "utils")

for folder in ${folders[@]}; do
    cp -r $folder build
    find build -name test -exec rm -rf {} \; 2> /dev/null
done

echo "* Removing unnecessary folders"
find . -maxdepth 1 \! \( -name build \) -exec rm -rf '{}' \; 2> /dev/null

echo "* Adding missing imports to components"

wp_folders=("blocks" "components" "data" "date" "editor" "element" "i18n" "utils")
vars=("wpApiSettings" "userSettings" "_wpDateSettings" "jQuery")

for file in $(find build -name "*.js"); do
	# add React and ReactDOM
    imports="import React from 'react';"
# import ReactDOM from 'react-dom';"

    n="${file//[^\/]}"

    replace_str=""

    for ((i=1;i<${#n};i++)); do
        replace_str="$replace_str../"
    done

    # add imports for vars
    for var in ${vars[@]}; do
	    if grep -q $var "$file"; then
	        imports="$imports
import { $var } from '$replace_str../../core';"
	    fi
	done

	# add import for wp
	if grep -q " wp\." "$file"; then
	    imports="$imports
import { wp } from '$replace_str../../core';"
    else
        if grep -q "\twp\." "$file"; then
            imports="$imports
import { wp } from '$replace_str../../core';"
        fi
	fi

	# add import for underscore
	if grep -q " _\." "$file"; then
	    imports="$imports
import _ from 'lodash';"
	fi

	# replace @wp path with relative paths
    for wp in ${wp_folders[@]}; do
        find_str="@wordpress/$wp"

        if grep -q $find_str "$file"; then
            sed -i -e 's,'"$find_str"','"$replace_str$wp"',g' $file

            rm -f "$file-e"
        fi
    done

    #remove !!sass-variables-loader!
    if grep -q "!!sass-variables-loader!" "$file"; then
        sed -i -e 's,'"!!sass-variables-loader!"','',g' $file

        rm -f "$file-e"
    fi

    echo "$imports
$(cat $file)" > $file
done

mv build/* .
rm -r build

echo "* Finishing"
