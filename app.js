
const buddyClub = (schoolYear) => {
  const DWEEKS  = ['月','火','水','木','金','土','日'];
  const TIMES = ['9:00', '10:00', '11:00', '15:00', '16:00', '17:00'];
  const DISCOUNTS = [0, -3600, -5400, -9000, -10800, -12000];

  const CLUB_ZAPPI = {
    'サッカー': [ { name: 'グラウンド使用料', amounts: [ 1100, 1650, 2200, ], }, ],
  };

  const helper = {
    encodeHash(obj) {
      const data = [];

      obj.forEach(x => {
        //data.push(x.index, x.dweek, x.time);
        const club = club_data[ Object.keys(club_data).find(key => key === x.club_id) ];
        
        data.push(
          club.index,
          DWEEKS.indexOf(x.dweek),
          TIMES.indexOf(x.time),
        );
      });

      return btoa(encodeURIComponent(data.join(',')));
    },
    decodeHash(str) {
      const data = decodeURIComponent(atob(str)).split(',').map(x => parseInt(x));

      return helper.arraySplit(data, 3).map(x => {
        return {
          club_id: Object.keys(club_data).find(key => club_data[key].index === x[0]),
          dweek: DWEEKS[x[1]],
          time: TIMES[x[2]],
        };
      });
    },
    arraySplit(arr, size) {
      return arr.reduce((previous, _, i) => i % size ? previous : [...previous, arr.slice(i, i + size)], []);
    },
  };

  const club_data_ary = CLUB_DATA_TSV.trim().split(/\n/).map(x => x.split(/\t/)).filter(x => x[2] === schoolYear);

  let index = 0;
  const club_data = club_data_ary.reduce((memo, x) => {
    const [id, type, school_year, dweek, time, running, ...s ] =  x;
    if (!memo[id]) {
      memo[id] = {
        index: ++index,
        timetable: [],
      };
    }

    memo[id].id = id;
    memo[id].type = type;
    memo[id].school_year = school_year;
    memo[id].timetable.push({ dweek, time, });

    if (running) {
      memo[id].running = parseInt(running, 10);
      memo[id].mfee = s.map(y => y ? parseInt(y, 10) : null);
    }

    return memo;
  }, {});

  const reset = () => {
    $('#output').empty();

    const table = $('<table class="table">').appendTo($('#output'));
    const output = $('<div>').appendTo($('#output'));

    const tr = $('<tr>').appendTo(table);
    tr.append($('<th>').text(''));

    DWEEKS.forEach(x => {
      tr.append($('<th>').text(x));
    });

    const selects = {};
    TIMES.forEach(x => {
      const tr = $('<tr>').appendTo(table);
      tr.append($('<th>').text(x));
      DWEEKS.forEach(y => {
        const select = $('<select class="form-select">');
        select.data('frame', [y, x].join('-'));
        select.append($('<option>'));
        select.on('change', self => {
          const selecteds = Object.keys(selects).reduce((selecteds, key) => {
            const selected = $('option:selected', selects[key]);
            if (selected.data('club')) {
              selecteds.push({ club_id: selected.data('club').id, dweek: selected.data('dweek'), time: selected.data('time'), index: selected.data('club').index, });
            }
            return selecteds;
          }, []);

          location.hash = '!' + helper.encodeHash(selecteds)
          disp(output);
        });
        tr.append($('<td>').append(select));
        selects[select.data('frame')] = select;
      });
    });

    Object.keys(club_data).forEach(club_id => {
      const club = club_data[club_id];
      club.timetable.forEach(tt => {
        const key = [tt.dweek, tt.time].join('-');
        const val = club_id;
        const select = selects[key];
        select.append($('<option>').val(val).text(`${club.id} [${club.type}]`).data({club: club, dweek: tt.dweek, time: tt.time,}));
      });
    });

    $('select', '#output').toArray().forEach(select => {
      if ($('option', select).length === 1) {
        $(select).hide();
      } else {
        $(select).show();
      }
    });

    return output;
  };

  const redume = (selecteds) => {
    let selected;
    $('select', '#output').toArray().forEach(select => {
      const frame = $(select).data('frame');
      if ((selected = selecteds.find(x => [x.dweek, x.time].join('-') === frame))) {
        $(select).val(selected.club_id);
      }
    });
  };

  const disp = (output) => {
    let selecteds;
    let selecteds_dist;

    try {
      const hash = location.hash.replace(/^#/, '');

      if (hash.indexOf('!') !== 0) {
        return;
      }
      selecteds = helper.decodeHash(hash.replace(/^!/, ''));
    } catch(e) {
      console.log(e);
      return;
    }

    if (selecteds) {
      selecteds_dist = selecteds.reduce((memo, selected) => {
        if (!memo[selected.club_id]) {
          memo[selected.club_id] = [];
        }
        memo[selected.club_id].push(selected);
        return memo;
      }, {});
    }

    const total = {
      club_len: 0,
      school_len: 0,
      event_len: 0,
      fee: 0,
      running: 0,
      zappi: 0,
    };

    output.empty();
    
    const ol = $('<ol>').appendTo(output);
    Object.keys(selecteds_dist).forEach(club_id => {
      const selecteds = selecteds_dist[club_id];
      const club = club_data[club_id];
      const fee = club.mfee[selecteds.length - 1];
      const running = club.running;

      total[ club.type === 'クラブ' ? 'club_len' : 'school_len' ]++;
      total.event_len += selecteds.length;
      total.fee += fee;
      total.running += running;

      let output_html = `[${club.type}] ${club_id} 月謝: &#xA5;${fee}, 運営費: &#xA5;${running}`;
      if (CLUB_ZAPPI[club_id]) {
        CLUB_ZAPPI[club_id].forEach(zappi => {
          const _amount = zappi.amounts[selecteds.length - 1];
          total.zappi += _amount;
          output_html += `, ${zappi.name}: &#xA5;${_amount}`;
        });
      }

      if (club.type === 'クラブ') {
        output_html += `, <span style="color: #f00;">延長割引(${total.club_len})</span>`;
      }

      ol.append($('<li>').html(output_html));

      const ul = $('<ul>').appendTo(ol);
      selecteds.forEach(selected => {
        const { club, dweek, time, } = selected;
        ul.append($('<li>').text(`${dweek}曜日 ${time}`));
      });
    });

    output.append($('<h3>').text('合計'));
    const row = $('<ul>').appendTo(output);

    // 割引計算: ５種目以降は追加の割引無し
    let discount = 0;
    if (DISCOUNTS.length <= total.club_len) {
      discount = DISCOUNTS[DISCOUNTS.length - 1];
    } else {
      discount = DISCOUNTS[total.club_len];
    }

    row.append([
      $(`<li>`).text(`クラブ数: ${total.club_len}`),
      $(`<li>`).text(`スクール数: ${total.school_len}`),
      $(`<li>`).text(`コマ数: ${total.event_len}`),
      $(`<li>`).text(`月謝合計: ${total.fee}`),
      $(`<li>`).text(`運営費合計: ${total.running}`),
      $(`<li>`).text(`運営雑費: ${total.zappi}`),
      $(`<li style="color: #f00;">`).text(`延長割引: ${discount}`),
      $(`<li>`).text(`合計: ${total.fee + total.running + total.zappi + discount}`),
    ]);
  };

  $(document).ready(() => {
    const output = reset();
    try {
      const hash = location.hash.replace(/^#/, '');

      if (hash.indexOf('!') === 0) {
        const selecteds = helper.decodeHash(hash.replace(/^!/, ''));
        redume(selecteds);
      }
    } catch {
    } finally {
      disp(output);
    }
  });
};
