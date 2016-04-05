#Angular A/B Test

Simple A/B testing directives because [Optimizely](https://www.optimizely.com/) is pretty rough at working with AngularJS projects.

Add an `<experiment>` tag like so:

```
<experiment name="sample-test" variant="a">
	<p>a variation</p>
</experiment>
```

It will show if there's a value for `abtests` in your localStorage that happens to look like this:

`[{"name":"sample-test","value":"a"}]`