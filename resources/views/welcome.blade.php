<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Inventory</title>
        <link rel="stylesheet" href="/css/all.css">

        <script>
            (function () {
                window.Laravel = {
                    csrfToken: '{{ csrf_token() }}'
                };
            })();
        </script>
    </head>
    <body>
        <div id="app">
            <mainapp></mainapp>
        </div>
    </body>

    {{--  This mix('/js/app.js') means mix('public/js/app.js')  --}}
    <script src="{{ mix('/js/app.js') }}"></script>
</html>
