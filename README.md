# gb

Git robot, a tool to operate on Github. It's still under heavy development now.


## Install
```
npm install -g gb
```


## Usage

```
Usage: gb [command][options] 

  Commands:

    config                 config github account
    list [options]         list repos etc.
    search [options]       search for repos
    info                   detail of account

  Options:

    -h, --help     output usage information


  Usages:

    gb config  [config Github account]
    gb info  [view my Github account]
    gb list -s <page>,<page_no>  [view starred repos, pagination is optional.]
    gb search -r <keyword>,<page>,<page_no>  [search repos with keyword, pagination is optional.]

  Demos:

    gb config  [config Github account]
    gb info  [view my Github account]
    gb list -s 2,10  [view 10 starred repos on page 2.]
    gb search -r "sumory",1,5  [search repos with "sumory". show 5 items on page 1.]
```


## License 

(The MIT License)

Copyright (c) 2014 sumory.wu <sumory.wu@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.