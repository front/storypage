# Cloning Front/Gutenberg
# and installing its dependencies 

cd src/components

# clone repo
echo "* Cloning front/gutenberg"
rm -rf gutenberg
git clone git@github.com:front/gutenberg.git

cd gutenberg

echo "* Runing npm install"
npm install

echo "* Runing npm run build (to generate css)"
npm run build

echo "* Remove generated js"
for file in $(find */build -name "*.js"); do
    rm ${file}
done

echo "* Coping folders to tmp/"
mkdir tmp

# gutenberg folders which contains components
folders=("blocks" "components" "data" "date" "edit-post" "editor" "element" "i18n" "utils" "viewport")

for folder in ${folders[@]}; do
    cp -r $folder tmp
    find tmp -name test -exec rm -rf {} \; 2> /dev/null
done

echo "* Removing all folders except tmp"
find . -maxdepth 1 \! \( -name tmp \) -exec rm -rf '{}' \; 2> /dev/null

echo "* Adding missing imports to components"

# wp_folders=("blocks" "components" "data" "date" "editor" "element" "i18n" "utils" "viewport")
vars=("wpApiSettings" "userSettings" "_wpDateSettings" "jQuery")

for file in $(find tmp -name "*.js"); do
	# add React
    imports="import React from 'react';"

    n="${file//[^\/]}"

    replace_str=""

    for ((i=1;i<${#n};i++)); do
        replace_str="$replace_str../"
    done

    # add imports for settings and jQuery
    for var in ${vars[@]}; do
	    if grep -q $var "$file"; then
	        imports="$imports
import { $var } from '$replace_str../../core';"
	    fi
	done

	# add import for wp var
	if grep -q " wp\." "$file"; then
	    imports="$imports
import { wp } from '$replace_str../../core';"
    else
        if grep -q "\twp\." "$file"; then
            imports="$imports
import { wp } from '$replace_str../../core';"
        fi
	fi

	# add import for lodash
	if grep -q " _\." "$file"; then
	    imports="$imports
import _ from 'lodash';"
	fi

	# replace @wp path with relative paths
    # for wp in ${wp_folders[@]}; do
    #     find_str="@wordpress/$wp"

    #     if grep -q $find_str "$file"; then
    #         sed -i -e 's,'"$find_str"','"$replace_str$wp"',g' $file

    #         rm -f "$file-e"
    #     fi
    # done

    # replace @wp/url
    if grep -q "@wordpress/url" "$file"; then
        sed -i -e 's,'"@wordpress/url"','"$replace_str../../core"',g' $file

        rm -f "$file-e"
    fi

    # remove !!sass-variables-loader!
    # if grep -q "!!sass-variables-loader!" "$file"; then
    #     sed -i -e 's,'"!!sass-variables-loader!"','',g' $file

    #     rm -f "$file-e"
    # fi

    echo "$imports
$(cat $file)" > $file
done

mv tmp/* .
rm -r tmp

echo "* Finishing"
