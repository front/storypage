# # Cloning Front/Gutenberg
# # and installing its dependencies 

cd src

if test -d $(pwd)/gutenberg; then
    # do something
    echo "* $(pwd)/gutenberg already exists"
else
    # clone repo
    echo "* Cloning Gutenberg"
    git clone git@github.com:front/gutenberg.git
fi

cd gutenberg

echo "* Removing node_modules if exist"
rm -rf node_modules

# echo "* Installing nvm and npm"
# npm install -g npm@>=5.0.0
# nvm install >=8.0.0

echo "* Runing npm install"
npm install

echo "* Runing npm run build"
npm run build

echo "* Removing node_modules"
rm -rf node_modules

# echo "* Removing build if exist"
rm -rf build

echo "* Coping folders to build/"
mkdir build

folders=("blocks" "components" "data" "date" "edit-post" "editor" "element" "i18n" "utils")

for folder in ${folders[@]}
do
    #echo $folder
    cp -r $folder build
    # rm -rf build/$folder/test build/$folder/**/test
    find build -name test -exec rm -rf {} \;
done

echo "* Adding missing imports to components"

wp_folders=("blocks" "components" "data" "date" "editor" "element" "i18n" "utils")
vars=("wpApiSettings" "userSettings" "_wpDateSettings" "jQuery")

for file in $(find build -name "*.js"); do
	# fix
	# if grep -q " _( " "$file"; then
 #        sed -i -e 's,'" _( "','" __( "',g' $file

 #        rm -f "$file-e"
 #    fi


	# add React and REact Dom imports
    imports="import React from 'react';
import ReactDOM from 'react-dom';"

    n="${file//[^\/]}"

    replace_str=""

    for ((i=1;i<${#n};i++)); do
        replace_str="$replace_str../"
    done

    # add imports for vars
    for var in ${vars[@]}
    do
	    if grep -q $var "$file"; then
	        imports="$imports
import { $var } from '$replace_str../../settings/config';"
	    fi
	done

	# add import for wp
	if grep -q "wp\." "$file"; then
	    imports="$imports
import { wp } from '$replace_str../../settings/config';"
	fi

	# add import for underscore
	if grep -q " _\." "$file"; then
	    imports="$imports
import _ from 'underscore';"
	fi

	# replace @wp path with relative paths
    for wp in ${wp_folders[@]}
    do
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

echo "* Finishing"

# to_fix=("blocks/api/raw-handling/strip-attributes.js" "blocks/api/raw-handling/inline-content-converter.js" "blocks/index.js" )

# # Check this after each Gutenberg update
# echo "Don't forget to check"
# for file in ${to_fix[@]}
# do
# 	echo "- $(pwd)/build/$file"
# done
# echo "files and fix imports order"


