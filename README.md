# js-bug-reporter
Simple bug reporter I wrote to submit quick bugs.


To use

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/11.6.16/sweetalert2.all.js" integrity="sha512-OOP8+9w8oPEn71RWL6nuGSfcyHtxeNHHyA5jwf9ecn53OQr2aEizblDzG+Esl+6CByZBTfp/bn2At5oBqwGFYw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
```

```js
const url = '{{ route('report.bug') }}';
const token = '{{ csrf_token() }}';
const bugReporter = new BugReporter(url, token);
```

```html
<div onclick="bugReporter.report();" class="text-sm-center d-none text-uppercase d-sm-block">
     <i class="fa fa-duotone fa-bug"></i> Report Bug
</div>
```
