## ISSUE 1

- When source is unavailable (Request fails with 403), `player.network.addEventListener('offline')` callback is triggered for some reason.

### Setup

- I am online
- Incorrect source set in `player.source.sources[0].src`

## ISSUE 2

- When I am actually offline, `player.addEventListener('error')` is triggered with code 10001 (An ad blocker has been detected) instead of `player.network.addEventListener('offline')` which is not triggerd at all.

### Setup

- `player.source.blockContentIfAdError` is set to `true`
- AdBlock is disabled
- I am offline

## ISSUE 3

- When ad is unavailable (Request fails with 403), `player.addEventListener('error')` callback is triggered with code 10001 (An ad blocker has been detected).

### Setup

- `player.source.blockContentIfAdError` is set to `true`
- AdBlock is disabled
- Incorrect source set in `player.source.ads[0].sources`
