#Angular A/B Test

Simple A/B testing directive because [Optimizely](https://www.optimizely.com/) is pretty rough at working with AngularJS projects.

---

[Example](http://ericfreeman.github.io/angular-ab-test/#/example) | [Documentation](http://ericfreeman.github.io/angular-ab-test/#/documentation)

---

## Get Started

Add an `<experiment>` tag like so:

```
<experiment name="sample-test" variant="a">
	<p>a variation</p>
</experiment>
```

It will show if there's a value for `abtests` in your localStorage that happens to look like this:

`[{"name":"sample-test","value":"a"}]`