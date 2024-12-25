[**patreon-dl**](../README.md) • **Docs**

***

[patreon-dl](../README.md) / DummyMediaItem

# Interface: DummyMediaItem

Minimal `MediaItem` typically used to represent media-type properties of elements, such
as video thumbnails and campaign avatar / cover photos.
As a `MediaItem` type, and hence also a `Downloadable` type, it can be used to create
`MediaFilenameResolver` and `DownloadTask` instances.

## Extends

- [`MediaLike`](MediaLike.md)

## Properties

### filename

> **filename**: `null` \| `string`

#### Inherited from

[`MediaLike`](MediaLike.md).[`filename`](MediaLike.md#filename)

#### Defined in

[src/entities/MediaItem.ts:4](https://github.com/patrickkfkan/patreon-dl/blob/794996b6269a4df0afea77da4d86f16365f2adf5/src/entities/MediaItem.ts#L4)

***

### id

> **id**: `string`

#### Inherited from

[`MediaLike`](MediaLike.md).[`id`](MediaLike.md#id)

#### Defined in

[src/entities/MediaItem.ts:3](https://github.com/patrickkfkan/patreon-dl/blob/794996b6269a4df0afea77da4d86f16365f2adf5/src/entities/MediaItem.ts#L3)

***

### mimeType

> **mimeType**: `null` \| `string`

#### Inherited from

[`MediaLike`](MediaLike.md).[`mimeType`](MediaLike.md#mimetype)

#### Defined in

[src/entities/MediaItem.ts:5](https://github.com/patrickkfkan/patreon-dl/blob/794996b6269a4df0afea77da4d86f16365f2adf5/src/entities/MediaItem.ts#L5)

***

### srcURLs

> **srcURLs**: `Record`\<`string`, `null` \| `string`\>

#### Defined in

[src/entities/MediaItem.ts:120](https://github.com/patrickkfkan/patreon-dl/blob/794996b6269a4df0afea77da4d86f16365f2adf5/src/entities/MediaItem.ts#L120)

***

### type

> **type**: `"dummy"`

#### Overrides

[`MediaLike`](MediaLike.md).[`type`](MediaLike.md#type)

#### Defined in

[src/entities/MediaItem.ts:118](https://github.com/patrickkfkan/patreon-dl/blob/794996b6269a4df0afea77da4d86f16365f2adf5/src/entities/MediaItem.ts#L118)
