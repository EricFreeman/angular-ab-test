# Angular A/B Test

[![npm version](https://badge.fury.io/js/angular-ab-test.svg)](https://badge.fury.io/js/angular-ab-test)
[![Bower version](https://badge.fury.io/bo/angular-ab-test.svg)](https://badge.fury.io/bo/angular-ab-test)

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
